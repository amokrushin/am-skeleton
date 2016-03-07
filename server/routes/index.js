const _ = require( 'lodash' ),
    express = require( 'express' ),
    router = express.Router(),
    controller = require( '../controllers/index' ),
    rbacMiddleware = require( '../middlewares/rbac' ),

    middlewaresIndex = [];

router.get( '/', middlewaresIndex, controller.index );

router.get( '/api/messages', controller.messages );

module.exports = router;