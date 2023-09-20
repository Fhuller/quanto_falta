para utilizar o jwt

const {verifyToken} = require("../validation")

router.post("/", verifyToken, (req, res) => {
    
})



para acesssar o swagger (documentação)

http://localhost:4000/api/docs/#/


peguei de base daqui:


https://github.com/sspangsberg/mongo_mongoose_nodejs_api/blob/main/swagger.yaml