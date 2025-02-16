package com.CloudPlatform.repository;

import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.TeacherHomework;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

public interface TeacherHomeworkRepository extends JpaRepository<TeacherHomework,String> {
    List<TeacherHomework> findAllByTeacherId(String teacherId);
    List<TeacherHomework> findAllByCourseId(int courseId);
    TeacherHomework findByHomeworkId(int homeworkId);
    Page<TeacherHomework> findByTeacherId(String studentId, Pageable pageable);
    Page<TeacherHomework> findByCourseId(int courseId, Pageable pageable);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value ="insert into teacherhomework (endtime, handinamount, `range`, starttime, subject, title, type, courseid, teacherid, homeworkid, handinalready, delayable, anspost) values (?1, ?2,?3, ?4, ?5, ?6,?7, ?8, ?9,?10,?11,?12,?13)")
    void Insert(Date endTime, int handinamount, String range, Date starttime, String subject, String title, String type, int courseid, String teacherid, int homeworkid, int handinalready, int delayable, int anspost);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value ="update teacherhomework set endtime=?1, handinamount=?2, `range`=?3, starttime=?4, subject=?5, title=?6, type=?7, courseid=?8, teacherid=?9, handinalready=?10 , delayable = ?11, anspost = ?12 where homeworkid = ?13")
    void Update(Date endTime, int handinamount, String range, Date starttime, String subject, String title, String type, int courseid, String teacherid, int handinalready,  int delayable, int anspost, int homeworkid);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value ="update teacherhomework set handinalready = ?1 where homeworkid = ?2")
    void UpdateHandinAlready(int handinalready, int homeworkid);

    @Transactional
    @Modifying
    @Query(nativeQuery = true,value ="update teacherhomework set anspost = ?1 where homeworkid = ?2")
    void UpdateAnspost(int anspost, int homeworkid);

    @Query(nativeQuery = true,value = "select max(homeworkId) from teacherhomework ")
    Integer getMaxId();

    @Transactional
    void deleteByCourseId(int courseId);
    @Transactional
    void deleteByHomeworkId(int homeworkId);


}
