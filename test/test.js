var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../app')
var db =  require('../db')

chai.use(chaiHttp)
chai.should()

describe("Product Routing", () => {

    before((done) => {
        db.connect('mongodb://admin:1234@floralcluster-shard-00-00-g48mu.mongodb.net:27017,floralcluster-shard-00-01-g48mu.mongodb.net:27017,floralcluster-shard-00-02-g48mu.mongodb.net:27017/test?ssl=true&replicaSet=FloralCluster-shard-0&authSource=admin&retryWrites=true', (err, db) => {
            done()
        })
    })

    describe("GET/", () => {
        it("should get a complete list of all products", (done) => {
            chai.request(app)
                .get('/list-product/0/1')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
        // it("should get a single product record", (done) => {
        //     const id = '5cd81e2de7b5fd028a1eb695';
        //     const code = 'MX';
        //     chai.request(app)
        //         .get(`/detail-a-product?id=${id}&&code=${code}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         });
        // });
        // it("should get a single product record with already loggged in user", (done) => {
        //     const id = '5cd81e2de7b5fd028a1eb695';
        //     const code = 'MX';
        //     chai.request(app)
        //         .get(`/detail-a-product?id=${id}&&code=${code}`)
        //         .set('user',{
        //             name: 'Hoa'
        //         })
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         });
        // });
        
        // it("should not get a single student record", (done) => {
        //     const id = '5cd81e2de7b5fd028a1eb691';
        //     const code = 'MA'
        //     chai.request(app)
        //         .get(`/detail-a-product?id=${id}&&code=${code}`)
        //         .end((err, res) => {
        //             res.should.have.status(404);
        //             done();
        //         });
        // });

    })    
    // describe("POST /", () => {

    //     // Test to post a comment about a product
    //     it("should post a comment about a product", (done) => {
    //         const id = '5cd81e2de7b5fd028a1eb695';
    //         const code = 'MX';
    //         var name = 'Sample';
    //         const title = 'Sample Title';
    //         const comment = 'Sample';
    //         chai.request(app)
    //             .post('/detail-a-product')
    //             .set('content-type', 'application/x-www-form-urlencoded')
    //             .send({ id, code, name, title, comment })
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     });
    //     //Test to search a non-empty string
    //     it("should search a non-empty string as a product name", (done) => {
    //         const param = "Hoa mau don";
    //         chai.request(app)
    //             .post('/search')
    //             .set('content-type', 'application/x-www-form-urlencoded')
    //             .send({ param })
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //     });
    //     //Test to search an empty string
    //     it("should search an empty string as a product name", (done) => {
    //         const param = "";
    //         chai.request(app)
    //             .post('/search')
    //             .set('content-type', 'application/x-www-form-urlencoded')
    //             .send({ param })
    //             .end((err, res) => {
    //                 res.should.have.status(204);
    //                 done();
    //             });
    //     });
    // });

})