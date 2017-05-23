Looks like token guard is just a simple token solution which is like using a password. TokenGuard is looking for the token in 3 places:

1. in the URL for parameter `?api_token=XXX`
2. in the header for "`Authorization: Bearer XXX`". Which is used in JWT, Oauth, etc.
3. in the header for "`Authorization: Basic XXX`". Which is Basic HTTP auth where XXX is _base64 encoded_ `username:password`. The password is used as the token.
