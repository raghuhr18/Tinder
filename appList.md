# DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/:status/:toUserId
- POST /request/review/:status/:requestId

useRouter
- GET /user/requests/received
- GET user/connections
- GET user/feed