$(function(){
            var str="";
            var str1="";
        $.ajax({
                type:'get',
                url:'http://39.105.47.139/marketData/getMarketData',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {},  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                        if(rs.length == 0){
                            $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }else{
                                $.each(rs, function(index, item){                       
                                str += '<tr data-data_id="'+ item.data_id +'" data-goods_name="'+ item.goods_name +'" data-goods_id="'+ item.goods_id +'" data-province_id="'+ item.province_id +'" data-province_name="'+ item.province_name +'" data-sales_volume="'+ item.sales_volume +'" data-start_date="'+ item.start_date +'" data-end_date="'+ item.end_date +'">\
                                        <td>'+ item.data_id +'</td>\
                                        <td>'+ item.goods_name +'</td>\
                                        <td>'+ item.province_name +'</td>\
                                        <td>'+ item.start_date +'</td>\
                                        <td>'+ item.end_date +'</td>\
                                        <td>'+ item.sales_volume +'</td>\
                                        <td>\
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
 * -----------------------------------------------查询事件--------------------------------------------------
*/

  $('.chaxun').click(function(){ 
                             
            var startTime=$('#startTime').val(); 
            var endTime=$('#endTime').val();
            var goodName=$('.search').val();
            if(goodName==''){
                 var goodName='全部';
            }
            var form={
                startDate:startTime,
                endDate:endTime,
                goodsName:goodName
            }
            $.ajax({
                type:'get',
                url:'http://39.105.47.139/marketData/searchMarketDataByDate',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: form,  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                        if(rs.length == 0){
                            $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }else{
                                $.each(rs, function(index, item){                       
                                str1 += '<tr data-data_id="'+ item.data_id +'" data-goods_name="'+ item.goods_name +'" data-goods_id="'+ item.goods_id +'" data-province_id="'+ item.province_id +'" data-province_name="'+ item.province_name +'" data-sales_volume="'+ item.sales_volume +'" data-start_date="'+ item.start_date +'" data-end_date="'+ item.end_date +'">\
                                        <td>'+ item.data_id +'</td>\
                                        <td>'+ item.goods_name +'</td>\
                                        <td>'+ item.province_name +'</td>\
                                        <td>'+ item.start_date +'</td>\
                                        <td>'+ item.end_date +'</td>\
                                        <td>'+ item.sales_volume +'</td>\
                                        <td>\
                                        <a href="#'+ item.data_id +'"  data-data_id="'+ item.data_id +'"  class="J_edit" data-toggle="modal" data-target="#editDialog"><i class="iconfont icon-pencil"></i>&nbsp;修改</a>\
                                        <a href="#'+ item.data_id +'" class=" J_allTeaDel"><i class="iconfont icon-lajixiang"></i>&nbsp;删除</a>\
                                        </td>\
                                    </tr>'
                            });
                            $('#J_template').append(str1);
                             $('#J_template').append('<tr><td colspan="12"><a class="J_add" href="javascript:void(0);"><i class="iconfont icon-tianjiaadd73 "></i></a></td></tr>');
                        }
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
    });

/**
* -----------------------------------------------编辑事件--------------------------------------------------
*/
         $(document).on('click','.J_edit', function(e){
            areaAjax();
        $('.hidId').val($(e.target).parents('tr').attr('data-data_id'));
        $('.hidId2').val($(e.target).parents('tr').attr('data-goods_id'));
         $('.editName').val($(e.target).parents('tr').attr('data-goods_name'));
         $('.editPrivince').val($(e.target).parents('tr').attr('data-province_id'));
         $('.editStart').val($(e.target).parents('tr').attr('data-start_date'));
         $('.editEnd').val($(e.target).parents('tr').attr('data-end_date'));
         $('.editNum').val($(e.target).parents('tr').attr('data-sales_volume'));

    });

    /*
    /**
     * 点击修改模态框的确定按钮
     */
    $(document).on('click','.J_editDlg', function(e){      
        var id =$('.hidId').val(),
            editName =$('.hidId2').val(),
            editPrivince =$('.editPrivince').val(),
            editStart =$('.editStart').val(),
            editEnd =$('.editEnd').val(),
            editNum = $('.editNum').val();
            $.ajax({
                type:'get',
                 url:'http://39.105.47.139/marketData/updateMarketData',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    dataId:id,
                    goods_id: editName,
                    province_id: editPrivince,
                    start_date: editStart,
                    end_date: editEnd,
                    sales_volume: editNum
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
            id = trDel.parents("tr").attr('data-data_id');
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
                dataId: id
            };
           
        $.ajax({
            type: 'get',
            url: 'http://39.105.47.139/marketData/deleteMarketData',
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
        nameAjax();
        areaAjax();
        $("#addDialog").modal('show');
        // add();
    });
    /**
     * 列表新增实现
     * @param  {[type]} e){                 } [description]
     * @return {[type]}      [description]
     */
    $('.J_addDlg').click(function(){
            add();
        });
    /**
     * 新增事件
     */
    function add(){
        var
            goodsName = $('.J_addForm').find("select[name='goodsName']").val(),
            province = $('.J_addForm').find("select[name='province']").val(),
            startTime = $('.J_addForm').find("input[name='startTime']").val();
            endTime = $('.J_addForm').find("input[name='endTime']").val(),
            sum = $('.J_addForm').find("input[name='sum']").val();
            form = {
                'goods_id': goodsName,
                'province_id': province,
                'sales_volume': sum,
                'start_date':startTime ,
                'end_date': endTime
            };
        $.ajax({
            type: "get",
            url: 'http://39.105.47.139/marketData/addMarketData',
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
     * 加载商品名称列表
     */
    function nameAjax(){
        $.ajax({
            type: 'get',
            url: 'http://39.105.47.139/goods/getGoods',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: '',
            dataType: "json",
            success: function (rs) {
                $('.goodsName').empty();
                    if(rs.length == 0){
                        $('.goodsName').append('<option value="">暂无数据！</option>')
                    }else{
                        $.each(rs, function(index, item){
                            $('.goodsName').append('<option value="'+item.goods_id+'">'+item.goods_name+'</option>')
                        })
                    }
            },
            error: function (message) {
                Alert("提示信息", "请求发送失败。")
            }
        });
    }
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


    }) 