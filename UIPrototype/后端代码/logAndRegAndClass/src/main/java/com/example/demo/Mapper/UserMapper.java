package com.example.demo.Mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import javax.jws.soap.SOAPBinding;

@Mapper
public interface UserMapper {
    @Insert("insert into userdemo (username,password,sid,email,telephone) values (#{username},#{password},#{sid},#{email},#{telephone})")
    public void save(User user);

    @Select("select * from userdemo where username=#{username} and password =#{password}")
    public User getUser(String username, String password);

    @Select("select * from userdemo where username=#{username}")
    public User getUserMessage(String username);

    @Update("update userdemo set password=#{password},sid=#{sid},email=#{email},telephone=#{telephone},nickname=#{nickname},theGrade=#{theGrade},theClass=#{theClass},type=#{type} where username=#{username}")
    public void updateUser(User user);

    @Select("select * from userdemo where username=#{username}")
    public User testUsername(String username);

    @Select("select * from userdemo where email=#{email}")
    public User testEmail(String email);

    @Select("select * from userdemo where sid=#{sid}")
    public User testSid(String sid);

}
