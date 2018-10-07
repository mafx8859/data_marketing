package com.datamarketing.dao;

import com.datamarketing.entity.Area;
import com.datamarketing.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by mafx on 2018/9/18.
 * @author mafx
 */
@Repository
public interface UserCommDao {
    /**
     * @param username
     * @param password
     * @return User
     */
    public User loginDao(@Param("username") String username,@Param("password") String password);
    public void addUserDao(User user);
    public List<User> getAllUserDao();
    public List<User> getAllUserByAdminIdDao(int adminId);
    public void deleteUserByIdDao(int userId);
    public User getUserByIdDao(int userId);
    public List<Area> getAreaDao();
    public List<Area> getAreaByUserIdDao(int userId);
    public void addRelatDao(@Param("userId") int userId,@Param("provinceIds") int[] provinceIds);
    public void updateUserPowerDao(int userId);
    public void updateUserByIdDao(@Param("user") User user,@Param("userId") int userId);
    public List<Area> getAdminAreaDao(int userId);
}
