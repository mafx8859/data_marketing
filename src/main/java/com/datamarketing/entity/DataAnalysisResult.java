package com.datamarketing.entity;

/**
 * Created by mafx on 2018/9/20.
 * @author mafx
 */
public class DataAnalysisResult {
    private int order;
    private String province_name;
    private String username;
    private int sales_volume;

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public String getProvince_name() {
        return province_name;
    }

    public void setProvince_name(String province_name) {
        this.province_name = province_name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getSales_volume() {
        return sales_volume;
    }

    public void setSales_volume(int sales_volume) {
        this.sales_volume = sales_volume;
    }
}
