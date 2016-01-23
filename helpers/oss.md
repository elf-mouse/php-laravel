# OSS

## `config/oss.php`

```
return [
  'ACCESS_ID' => '',
  'ACCESS_KEY' => '',
  'ENDPOINT' => 'oss-cn-hangzhou.aliyuncs.com',
  'BUCKET' => '',
  'OBJECTS' => [
    'test' => 'test/',
  ],
];
```

## `app/Helpers/OSSCommon.php`

```
namespace App\Helpers;

use OSS\OssClient;
use OSS\Core\OssException;

/**
 * Class Common.
 *
 * Common类，用于获取OssClient实例和其他公用方法
 */
class OSSCommon
{
    /**
     * 根据Config配置，得到一个OssClient实例.
     *
     * @return OssClient 一个OssClient实例
     */
    public static function getOssClient()
    {
        // 配置文件
        $ossConfig = config('oss');
        $endpoint = $ossConfig['ENDPOINT'];
        $accessKeyId = $ossConfig['ACCESS_ID'];
        $accessKeySecret = $ossConfig['ACCESS_KEY'];

        try {
            $ossClient = new OssClient($accessKeyId, $accessKeySecret, $endpoint, true);
        } catch (OssException $e) {
            printf(__FUNCTION__."creating OssClient instance: FAILED\n");
            printf($e->getMessage()."\n");

            return;
        }

        return $ossClient;
    }

    public static function getBucketName()
    {
        // 配置文件
        $ossConfig = config('oss');
        $bucket = $ossConfig['BUCKET'];

        return $bucket;
    }

    /**
     * 工具方法，创建一个存储空间，如果发生异常直接exit.
     */
    public static function createBucket()
    {
        $ossClient = self::getOssClient();
        if (is_null($ossClient)) {
            exit(1);
        }
        $bucket = self::getBucketName();
        $acl = OssClient::OSS_ACL_TYPE_PUBLIC_READ;
        try {
            $ossClient->createBucket($bucket, $acl);
        } catch (OssException $e) {
            $message = $e->getMessage();
            if (\OSS\Core\OssUtil::startsWith($message, 'http status: 403')) {
                echo 'Please Check your AccessKeyId and AccessKeySecret'."\n";
                exit(0);
            } elseif (strpos($message, 'BucketAlreadyExists') !== false) {
                echo 'Bucket already exists. Please check whether the bucket belongs to you, or it was visited with correct endpoint. '."\n";
                exit(0);
            }
            printf(__FUNCTION__.": FAILED\n");
            printf($e->getMessage()."\n");

            return;
        }
        echo __FUNCTION__.': OK'."\n";
    }

    public static function println($message)
    {
        if (!empty($message)) {
            echo strval($message)."\n";
        }
    }

    /**
     * 上传文件.
     */
    public static function uploadFile($objectType, $file)
    {
        $filename = '';

        $objects = config('oss')['OBJECTS'];
        if (in_array($objectType, array_keys($objects))) {
            $extension = $file->getClientOriginalExtension();
            $filename = time().str_random(4).'.'.$extension; // 随机文件名
            $object = $objects[$objectType].$filename;

            $bucket = self::getBucketName();
            $ossClient = self::getOssClient();

            $ossClient->uploadFile($bucket, $object, $file);
        }

        return $filename;
    }

    /**
     * 删除文件并备份.
     */
    public static function deleteFile($objectType, $filename)
    {
        $objects = config('oss')['OBJECTS'];
        $object = $objects[$objectType].$filename;

        $bucket = self::getBucketName();
        $ossClient = self::getOssClient();

        $doesExist = $ossClient->doesObjectExist($bucket, $object);

        if ($doesExist) {
            $ossClient->copyObject($bucket, $object, $bucket, $object.'.copy');
            $ossClient->deleteObject($bucket, $object);
        }
    }
}
```

## Usage

```
if ($request->hasFile('image')) {
    $file = $request->file('image');
    OSSCommon::deleteFile('test', $model->image); // backup & delete for updating
    $filename = OSSCommon::uploadFile('test', $file);
    $model->image = $filename;
}
```
