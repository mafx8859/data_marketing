$(document).ready(function(){
    var code;
createCode();
 $('.code').click(function(){                    
            createCode();   
    });


    $('.link-submit').click(function(){                    
        if(checkUser()&&checkPsw()&&checkYanzheng()){
            send();
        }     
    });

    /**
     * 发送登录信息ajax
     */
    function send(){
        var username = $('#username').val(),
            pwd = $('#password').val(),
            form = {
                username: username,
                password: pwd
            };
        $.ajax({
            type: 'get',
            url: "http://39.105.47.139/user/login",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,//JSON.stringify
            dataType: "json",
            success:function(rs){
                if(rs.user.level==0){
                    window.location.href = "../html/user/inventoryManagement.html";  
                }else if(rs.user.level==1){
                    window.location.href = "../html/common/inventoryManagement.html";  
                }else{
                    window.location.href = "../html/super/inventoryManagement.html";
                }
            },
            error: function (message) {
                alert('操作失败，请重新操作!');
            }
        });
    }

function checkUser(){
     var username = $('#username').val();
    if(username== "") {
        alert("用户名不能为空");
        return false;
    } else {
        return true;
    }
}

function checkPsw(){
    var pwd = $('#password').val();
    if(pwd== "") {
        alert("密码不能为空");
        return false;
    } else {
        return true;
    }
}

function checkYanzheng(){
var oValue = $("#inputCode").val().toUpperCase();
                if(oValue ==""){
                    alert("验证码不能为空");
                    return false;
                }else if(oValue != code){
                   alert("验证码错误");
                    oValue = "";
                    createCode();
                    return false;
                }else{
                   return true;
                }
}


            function createCode(){
                code = '';//首先默认code为空字符串
                var codeLength = 4;//设置长度，这里看需求，我这里设置了4
                // var codeV = $("div");
                //设置随机字符
                var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
                for(var i = 0; i < codeLength; i++){ //循环codeLength 我设置的4就是循环4次   
                     var index = Math.floor(Math.random()*36); //设置随机数范围,这设置为0 ~ 36  
                     code += random[index];  //字符串拼接 将每次随机的字符 进行拼接
            }
                 $(".code").text(code);//将拼接好的字符串赋值给展示的
            }

            $("#checkCode").bind('click',function() {
                    createCode();
                });
                
 

    /**
     * 注册新用户
     */
     $(document).on('click', '.regist', function(){
            areaAjax();
        $("#addDialog").modal('show');
        // add();
    });

    $('.J_addDlg').click(function(){
            add();
        });
    /**
     * 新增事件
     */
    function add(){
        var
            A_username = $('.J_addForm').find("input[name='A_username']").val(),
            A_password = $('.J_addForm').find("input[name='A_password']").val(),
            A_province_id = $('.J_addForm').find("select[name='A_province_id']").val();
            A_realname = $('.J_addForm').find("input[name='A_realname']").val(),
            A_phone = $('.J_addForm').find("input[name='A_phone']").val();
            form = {
                'username': A_username,
                'password': A_password,
                'province_id': A_province_id,
                'realname':A_realname ,
                'phoneNum': A_phone
            };
        $.ajax({
            type: "get",
            url: 'http://39.105.47.139/user/addUser',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                alert("注册成功!");
                $('#addDialog').modal('hide');
                window.location.reload(); 
            },
            error: function (message) {
                $('#addDialog').modal('hide');
                alert('操作失败，请求失败!');
            }
        });
    };


 
    /**
     * 加载地区列表
     */
    function areaAjax(){
        $.ajax({
            type: 'get',
            url: 'http://39.105.47.139/area/getArea',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: '',
            dataType: "json",
            success: function (rs) {
                $('.province').empty();
                    if(rs.length == 0){
                        $('.province').append('<option value="">暂无数据！</option>')
                    }else{
                        $.each(rs, function(index, item){
                            $('.province').append('<option value="'+item.province_id+'">'+item.province_name+'</option>')
                        })
                    }
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    }

});





