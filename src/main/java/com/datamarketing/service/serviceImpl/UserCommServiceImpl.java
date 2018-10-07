package com.datamarketing.service.serviceImpl;

import com.datamarketing.dao.UserCommDao;
import com.datamarketing.entity.Area;
import com.datamarketing.entity.User;
import com.datamarketing.service.UserCommService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Service
public class UserCommServiceImpl implements UserCommService {
    @Autowired
    UserCommDao userCommDao;
    @Override
    public User loginService(String username, String password) {

        return userCommDao.loginDao(username,password);
    }

    @Override
    public void addUserService(User user) {
        userCommDao.addUserDao(user);
    }

    @Override
    public List<User> getAllUserService() {
        return userCommDao.getAllUserDao();
    }

    @Override
    public List<User> getAllUserByAdminIdService(int adminId) {
        return userCommDao.getAllUserByAdminIdDao(adminId);
    }

    @Override
    public void deleteUserByIdService(int userId) {
        userCommDao.deleteUserByIdDao(userId);
    }

    @Override
    public User getUserByIdService(int userId) {
        return userCommDao.getUserByIdDao(userId);
    }

    @Override
    public List<Area> getAreaService() {
        return userCommDao.getAreaDao();
    }

    @Override
    public List<Area> getAreaByUserIdService(int userId) {
        return userCommDao.getAreaByUserIdDao(userId);
    }

    @Override
    public void addAdminProvinceService(int userId, int[] provinceIds) {
        //添加管理员所管理的省份id到关系表
        userCommDao.addRelatDao(userId,provinceIds);
        //修改该用户的权限
        userCommDao.updateUserPowerDao(userId);
    }

    @Override
    public void updateUserByIdService(User user, int userId) {
        userCommDao.updateUserByIdDao(user,userId);
    }

    @Override
    public List<Area> getAdminAreaService(int userId) {
        return userCommDao.getAdminAreaDao(userId);
    }
}
