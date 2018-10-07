package com.datamarketing.service;

import com.datamarketing.entity.Area;
import com.datamarketing.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Service
public interface UserCommService {
    public User loginService(String username, String password);
    public void addUserService(User user);
    public List<User> getAllUserService();
    public List<User> getAllUserByAdminIdService(int adminId);
    public void deleteUserByIdService(int userId);
    public User getUserByIdService(int userId);
    public List<Area> getAreaService();
    public List<Area> getAreaByUserIdService(int userId);
    public void addAdminProvinceService(int userId,int[] provinceIds);
    public void updateUserByIdService(User user,int userId);
    public List<Area> getAdminAreaService(int userId);
}
