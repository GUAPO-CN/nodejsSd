function fn01(){  //��дһ������ fn01
    console.log("module02-fn01");
}
function fn02(){  //��дһ������ fn02
    console.log("module02-fn02");
}

//��¶�ӿ�
//module.exports = {
//    "fn01":fn01,
//    "fn02":fn02
//}


//��¶�ӿ�
exports.fn01 = fn01;
exports.fn02 = fn02;