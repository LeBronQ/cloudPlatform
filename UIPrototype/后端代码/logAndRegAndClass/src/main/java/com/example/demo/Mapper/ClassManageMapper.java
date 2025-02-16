package com.example.demo.Mapper;

import com.example.demo.model.ClassManage;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ClassManageMapper {
    @Insert("insert into classmanage (id,number,classNo) values (#{id},#{number},#{classNo})")
    public void addClass(ClassManage classManage);

    @Select("select * from classmanage where id=#{getId} and classNo = #{getclassNo}")
    public ClassManage getClass(String getId,String getclassNo);

    @Update("update classmanage set number=number+ #{n} where id=#{getId}")
    public void updateClass(String getId,int n);
}
