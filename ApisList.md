
# Techie_Tinder APIs

## Auth router
POST /tinder.com/user/signup
POST /tinder.com/user/login
POST /tinder.com/user/logout
DELETE/tinder.com/user/delete

###  User/profile
GET /tinder.com/user/profile/view
PATCH /tinder.com/profle/update
PATCH /tinder.com/profle/password
GET /tinder.com/profle/savedprofile or liked
GET /tinder.com/profle/blockedprofiles


## Matching
GET /tinder.com/matches
POST /tinder.com/match/{userId}
DELETE /tinder.com/unmatch/{userId}
## Swiping
POST /tinder.com/swipe/right/{userId}
POST /tinder.com/swipe/left/{userId}
GET /tinder.com/potential-matches





###  User/connection
POST /tinder.com/connecton/reqestsend
POST /tinder.com/connecton/dislike

### Reporting
POST /tinder.com/report/{userId}

