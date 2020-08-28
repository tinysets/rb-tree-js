import { RBTree } from "./rbtree";


setTimeout(() => {

    if (1) { // test insert
        let startTime = Date.now();
        let insertTestCount = 100;
        for (let j = 0; j < insertTestCount; j++) {
            let ranCount = 1000
            let rbarr = [];
            for (let i = 0; i < ranCount; i++) {
                rbarr.push(Math.floor(Math.random() * 1000000));
            }
            let rbTree = new RBTree();
            rbTree.init(rbarr);
            rbTree.checkRbTree();
        }
        let endTime = Date.now();
        console.log('rbtree insert test time is ', endTime - startTime);
    }


    if (1) { // test delete
        let startTime = Date.now();
        let deleteTestCount = 100;
        for (let j = 0; j < deleteTestCount; j++) {
            let ranCount = 1000
            let rbarr = [];
            for (let i = 0; i < ranCount; i++) {
                rbarr.push(Math.floor(Math.random() * 1000000));
            }
            let rbTree = new RBTree();
            rbTree.init(rbarr);
            rbTree.checkRbTree();

            for (const num of rbarr) {
                rbTree.delete(num);
                rbTree.checkRbTree();
            }
        }
        let endTime = Date.now();
        console.log('rbtree delete test time is ', endTime - startTime);
    }

}, 1000);