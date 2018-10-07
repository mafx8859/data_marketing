$(function(){
            var str="";
            var str1="";
        $.ajax({
                type:'get',
                url:'http://39.105.47.139/user/getUser',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {},  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                        if(rs.length == 0){
                            $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }else{
                                $.each(rs, function(index, item){ 
                                    if (item.level == 0) {
                                    var level = "用户";
                                }else if(item.level == 1){
                                    var level = "普通管理员";
                                }else {
                                    var level = "超级管理员";
                                }
                                str += '<tr data-id="'+ item.id +'" data-username="'+ item.username +'" data-password="'+ item.password +'" data-level="'+ item.level +'">\
                                        <td>'+ item.id +'</td>\
                                        <td>'+ item.username +'</td>\
                                        <td>'+ item.password +'</td>\
                                        <td>'+ level +'</td>\
                                        <td>\
                                        <a href="#'+ item.id +'"  data-id="'+ item.id +'"  class="editManage" data-toggle="modal" data-target="#editManage"><i class="iconfont icon-pencil"></i>&nbsp;设为管理员</a>\
                                        <a href="#'+ item.id +'"  data-id="'+ item.id +'"  class="J_edit" data-toggle="modal" data-target="#editDialog"><i class="iconfont icon-pencil"></i>&nbsp;修改</a>\
                                        <a href="#'+ item.id +'" class=" J_allTeaDel"><i class="iconfont icon-lajixiang"></i>&nbsp;删除</a>\
                                        </td>\
                                    </tr>'
                            });
                            $('#J_template').append(str);
                             $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });

/**
* -----------------------------------------------设为管理员--------------------------------------------------
*/
    $(document).on('click', '.editManage', function(e){
            areaAjax2();
            $('#editManage').modal('show');
        var
            trDel = $(e.target),
            id = trDel.parents("tr").attr('data-id');
        $('.hidId').val(id);
    });

    $('.J_editManage').click(function(){
            editManage();
        });
    /**
     * 传递给后台
     */
    function editManage(){

 var provinceIds =[]; 
 $('input[name="checkbox"]:checked').each(function(i){ 
    provinceIds[i] =$(this).val();
}); 

 


        var userId =$('.hidId').val(),
            //provinceId = $('.chooseProvinces').find("input[name='checkbox']:checked").val(),
            form = {
                'userId': userId,
                'adminProvince': provinceIds
            };
        $.ajax({
            type: "get",
            url: 'http://39.105.47.139/user/creatAdmin',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            traditional :true, 
            success: function (rs) {
                $('#editManage').modal('hide');
                window.location.reload(); 
            },
            error: function (message) {
                $('#editManage').modal('hide');
                alert('操作失败，请求失败!');
            }
        });
    };
/**
* -----------------------------------------------编辑事件--------------------------------------------------
*/
         $(document).on('click','.J_edit', function(e){
            areaAjax();
        $('.hidId').val($(e.target).parents('tr').attr('data-id'));
         $('.edit_username').val($(e.target).parents('tr').attr('data-username'));
         $('.edit_password').val($(e.target).parents('tr').attr('data-password'));
         $('.edit_province_id').val($(e.target).parents('tr').attr('data-start_date'));
         $('.edit_realname').val($(e.target).parents('tr').attr('data-end_date'));
         $('.edit_phone').val($(e.target).parents('tr').attr('data-sales_volume'));

    });

    /*
    /**
     * 点击修改模态框的确定按钮
     */
    $(document).on('click','.J_editDlg', function(e){      
        var id =$('.hidId').val(),
            edit_username =$('.edit_username').val(),
            edit_password =$('.edit_password').val(),
            edit_province_id =$('.edit_province_id').val(),
            edit_realname =$('.edit_realname').val(),
            edit_phone = $('.edit_phone').val();
            $.ajax({
                type:'get',
                 url:'http://39.105.47.139/user/updateUserById',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    userId:id,
                    username: edit_username,
                    password: edit_password,
                    province_id: edit_province_id,
                    realname: edit_realname,
                    phoneNum: edit_phone
                },  
                dataType: "json",
                success: function (rs) {
                    $('#editDialog').modal('hide');
                            location.reload();
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
            });
    });


    /**
      * -----------------------------------------------删除事件--------------------------------------------------
     */
    /*
        删除
    */
    $(document).on('click','.J_allTeaDel',function(e){
        $('#J_DEl').modal('show');
        var
            trDel = $(e.target),
            id = trDel.parents("tr").attr('data-id');
        $('.hidId').val(id);
    });
    /*确认删除*/
    $(document).on('click','.J_delSure',function(){
        del();
        $('#J_DEl').modal('hide');
    });
    /**
      * 删除事件
     */
    function del(id){
       
        var id = $('.hidId').val();
            data = {
                userId: id
            };
           
        $.ajax({
            type: 'get',
            url: 'http://39.105.47.139/user/deleteUserById',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,
            dataType: "json",
           success: function (rs) {
                $('#J_DEl').modal('hide');
                window.location.reload();
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    }





     /**
      * -----------------------------------------------新增事件--------------------------------------------------
     */
    /*
    
    /**
     * 列表点击新增事件
     * @param  {[type]} ){                     }
     * @return {[type]}     [description]
     */
    $(document).on('click', '.J_add', function(){
            areaAjax();
        $("#addDialog").modal('show');
        // add();
    });
    /**
     * 列表新增实现
     */
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

    /**
     * 加载地区列表(超级管理员)
     */
    function areaAjax2(){
        $.ajax({
            type: 'get',
            url: 'http://39.105.47.139/area/getArea',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: '',
            dataType: "json",
            success: function (rs) {
                 $('.chooseProvinces').empty();
                        $.each(rs, function(index, item){
                            // $('.chooseProvinces').append('<ul>'+item.province_name+'</ul>')
                        str1 += '<a href="javascript:void(0);"><input type="checkbox" name="checkbox" value='+item.province_id+' style="margin-left:20px">'+ item.province_name +'</a>'
                        //str1 += '<li>'+ item.province_name +'</li>'
                        })
                        // $('.chooseProvinces').html(str1);
                        $('.chooseProvinces').append(str1);
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    }



    }) 