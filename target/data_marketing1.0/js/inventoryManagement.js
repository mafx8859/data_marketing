$(function(){
    cha();

     $('.chaxun').click(function(){                  
            chaBufen();  
    });


    function cha(){
            var str="";
        $.ajax({
                type:'get',
                url:'http://39.105.47.139/goods/getGoods',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: { },  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                        if(rs.length == 0){
                           // $('#J_template').append('<tr><td colspan="6">暂无数据！</td></tr>');
                              $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }else{
                                $.each(rs, function(index, item){                       
                                str += '<tr data-goods_id="'+ item.goods_id +'" data-goods_name="'+ item.goods_name +'" data-goods_price="'+ item.goods_price +'" data-goods_num="'+ item.goods_num +'">\
                                        <td>'+ item.goods_id +'</td>\
                                        <td>'+ item.goods_name +'</td>\
                                        <td>'+ item.goods_price +'</td>\
                                        <td>'+ item.goods_num +'</td>\
                                        <td>\
                                        <a href="#'+ item.goods_id +'"  data-goods_id="'+ item.goods_id +'"  class="J_edit" data-toggle="modal" data-target="#editDialog"><i class="iconfont icon-pencil"></i>&nbsp;修改</a>\
                                        <a href="#'+ item.goods_id +'" class=" J_allTeaDel"><i class="iconfont icon-lajixiang"></i>&nbsp;删除</a>\
                                        </td>\
                                    </tr>'
                            });
                            $('#J_template').append(str);
                            $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }
                    // }
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}




    function chaBufen(){
            var good_name = $(".search").val();
            var str="";
        $.ajax({
                type:'get',
                async:false,
                url:'http://39.105.47.139/goods/search',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    goodsName:good_name
                },  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                    // if( rs.stateCode  == 0){
                    //     alert("查询失败")                   
                    // }else{     
                     //var list = JSON.parse(rs.list);
                     //var list = rs.list;
                        if(rs.length == 0){
                           // $('#J_template').append('<tr><td colspan="6">暂无数据！</td></tr>');
                              $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }else{
                                $.each(rs, function(index, item){                       
                                str += '<tr data-goods_id="'+ item.goods_id +'" data-goods_name="'+ item.goods_name +'" data-goods_price="'+ item.goods_price +'" data-goods_num="'+ item.goods_num +'">\
                                        <td>'+ item.goods_id +'</td>\
                                        <td>'+ item.goods_name +'</td>\
                                        <td>'+ item.goods_price +'</td>\
                                        <td>'+ item.goods_num +'</td>\
                                        <td>\
                                        <a href="#'+ item.goods_id +'"  data-goods_id="'+ item.goods_id +'"  class="J_edit" data-toggle="modal" data-target="#editDialog"><i class="iconfont icon-pencil"></i>&nbsp;修改</a>\
                                        <a href="#'+ item.goods_id +'" class=" J_allTeaDel"><i class="iconfont icon-lajixiang"></i>&nbsp;删除</a>\
                                        </td>\
                                    </tr>'
                            });
                            $('#J_template').append(str);
                            $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }
                    // }
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}
 /**
      * -----------------------------------------------编辑事件--------------------------------------------------
     */
         $(document).on('click','.J_edit', function(e){
        $('.hidId').val($(e.target).parents('tr').attr('data-goods_id'));
        $('.J_editName').val($(e.target).parents('tr').attr('data-goods_name'));
        $('.J_editPrice').val($(e.target).parents('tr').attr('data-goods_price'));
         $('.J_editNum').val($(e.target).parents('tr').attr('data-goods_num'));


    });

    /*
    /**
     * 点击修改模态框的确定按钮
     */
    $(document).on('click','.J_editDlg', function(e){        
        var id =$('.hidId').val(),
            name = $('.J_editName').val(),
            price = $('.J_editPrice').val(),
            num = $('.J_editNum').val();
        if(name == ''){
            alert("请填写商品名称");
            return false;
        }else if(price == ''){
           alert("请填写商品单价");
            return false;
        }else if(num == ''){
            alert("请填写库存数量");
            return false;
        }else{
            $.ajax({
                type:'get',
                 url:'http://39.105.47.139/goods/updateGoods',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    goodsId: id,
                    goods_name: name,
                    goods_price: price,
                    goods_num: num
                },  
                dataType: "json",
                success: function (rs) {
                    $('#editDialog').modal('hide');
                    location.reload();
                    // if( rs.code == 0){
                    //         location.reload();
                    // }else{                
                    //     alert( rs.errMsg);
                    // }
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
            });
        };
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
            id = trDel.parents("tr").attr('data-goods_id');
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
                goodsId: id
            };
        $.ajax({
            type: 'get',
            url: 'http://39.105.47.139/goods/deleteGoods',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,
            dataType: "json",
            success: function (rs) {
                $('#J_DEl').modal('hide');
                window.location.reload();
                // if(rs.code == 0){
                //         window.location.reload();
                // }else{
                //     $('#J_DEl').modal('hide');
                //     alert(rs.errMsg);
                // }
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
     */
    $(document).on('click', '.J_add', function(){
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
            J_AddName = $('.J_addForm').find("input[name='J_AddName']").val(),
            J_AddPrice = $('.J_addForm').find("input[name='J_AddPrice']").val(),
            J_AddNum = $('.J_addForm').find("input[name='J_AddNum']").val();
            form = {
                'goods_name': J_AddName,
                'goods_price': J_AddPrice,
                'goods_num': J_AddNum
            };
        $.ajax({
            type: "get",
            url: 'http://39.105.47.139/goods/addGoods',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,     //JSON.stringify
            dataType: "json",
            success: function (rs) {
                $('#addDialog').modal('hide');
                window.location.reload(); 
                // if( rs.code == 0){ 
                //      window.location.reload();                  
                // }else{                
                //     alert("刷新失败");
                // }
            },
            error: function (message) {
                $('#addDialog').modal('hide');
                alert('操作失败，请求失败!');
            }
        });
    };




    }) 