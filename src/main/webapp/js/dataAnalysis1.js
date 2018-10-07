$(function(){
            areaAjax();
            var str="";
/**
 * -----------------------------------------------查询事件--------------------------------------------------
*/

  $('.chaxun').click(function(){ 
                             
            var startTime=$('#startTime').val(); 
            var endTime=$('#endTime').val();
            var paixu=$('.paixu').val();
            var provinceId=$('.province').val();
            var form={
                startDate:startTime,
                endDate:endTime,
                preRank:paixu,
                provinceId:provinceId
            }
            $.ajax({
                type:'get',
                url:'http://39.105.47.139/marketData/dataAnalysis',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: form,  
                dataType: "json",
                // success: function (rs) {
                //     $('#J_template').empty();
                //     if(rs.length == 0){
                //             $('#J_template').append('<tr><td colspan="6">暂无数据！</td></tr>');};
                //                 $.each(rs, function(index, item){                       
                //                 str += '<tr data-data_id="'+ item.data_id +'" data-goods_id="'+ item.goods_id +'" data-username="'+ item.username +'" data-order="'+ item.order +'" data-province_id="'+ item.province_id +'" data-province_name="'+ item.province_name +'" data-sales_volume="'+ item.sales_volume +'" data-start_date="'+ item.start_date +'" data-end_date="'+ item.end_date +'">\
                //                         <td>'+ item.order +'</td>\
                //                         <td>'+ item.province_name +'</td>\
                //                         <td>'+ item.username +'</td>\
                //                         <td>'+ item.sales_volume +'</td>\
                //                     </tr>'
                //             });
                //             $('#J_template').append(str);
                // },
                success: function (rs) {
                    $('#J_template').empty();
                        for (var i = 0; i < rs.length; i++) {
                            $('#J_template').append("<tr><td>" + rs[i].order + "</td>"
                                            +"<td>" + rs[i].province_name+ "</td>"
                                            +"<td>" + rs[i].username + "</td>"
                                            +"<td>" + rs[i].sales_volume + "</td></tr>");
                        };
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
    });


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