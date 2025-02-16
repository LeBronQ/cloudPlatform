package com.cloud.course.service;


import com.alibaba.fastjson.JSONObject;
import com.cloud.course.dto.WholeCourse;
import com.cloud.course.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {

    WholeCourse getCourseById(String id);

    List<WholeCourse> getCoursesByTeacher(String id, Pageable p);

    void deleteById(String id);

    Integer addcourse(JSONObject object);

    List<CourseBulletin> getBulletin(String id);

    void addBulletin(JSONObject object);

    void deleteBulletin(String id);

    List<WholeCourse> getCourseByStudent(String id, Pageable p);

    List<Notification> getNoteByUser(String id);

    void addNote(JSONObject object);

    void deleteNote(String id);

    void register(JSONObject object);

    Page<CourseBulletin> getPageBulletin(String id, Pageable p);

    List<WholeCourse> getAllCourses(Pageable p);

    Notification getNoteById(String id);

    StudentCourseStat getRank(String courseId, String userId);

    List<StudentCourseInfo> getCourseStudent(int parseInt);

    void deleteCourseStudent(String courseId, String userId);

    void updateCourseStudent(String courseId, String userId, String grade);

    List<WholeCourse> getAllCoursesN();
    List<WholeCourse> getCoursesByStudentN(String id);
    List<WholeCourse> getCoursesByTeacherN(String teacher_id);

    List<WholeCourse> getStudentEndCourses(String student_id);

    List<WholeCourse> getTeacherEndCourses(String teacher_id);
}
