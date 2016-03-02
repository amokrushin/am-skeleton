const _ = require( 'lodash' ),
    express = require( 'express' ),
    router = express.Router(),
    controller = require( '../controllers/index' ),
    rbacMiddleware = require( '../middlewares/rbac' ),

    middlewaresIndex = [];

router.get( '/', middlewaresIndex, controller.index );

module.exports = router;