package com.datamarketing.test;

import com.datamarketing.entity.User;

/**
 * Created by mafx on 2018/9/19.
 */
public class EntityFactory {
    public static User gerUser(){
        User user=new User();
        user.setId(3);
        user.setLevel(1);
        user.setProvince_id(2);
        return user;
    }
}
