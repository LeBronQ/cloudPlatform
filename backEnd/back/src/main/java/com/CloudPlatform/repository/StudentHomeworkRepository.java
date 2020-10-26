package com.CloudPlatform.repository;

import com.CloudPlatform.entity.StudentHomework;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface StudentHomeworkRepository extends JpaRepository<StudentHomework,String> {
    List<StudentHomework> findByStudentId(String studentId);
    List<StudentHomework> findByHomeworkId(int homeworkId);

    Page<StudentHomework> findAllByHomeworkId(int homeworkId, Pageable pageable);

    @Query(nativeQuery = true,value="select * from studenthomework where courseid=?2 and studentid=?1 order by starttime desc ")
    List<StudentHomework> findByStudentIdAndCourseId(String studentId, int courseId);
    StudentHomework findByStudentIdAndHomeworkId(String studentId, int homeworkId);
    @Transactional
    void deleteByStudentIdAndHomeworkId(String studentId,int homeworkId);
    @Transactional
    void deleteByStudentIdAndCourseId(String studentId, int courseId);

    @Query(nativeQuery = true,value = "select count(*) from studenthomework where score > (select score from studenthomework where studentid = ?1 and homeworkid=?2) and homeworkid=?2")
    Integer getStudentHomeworkRank(String studentId,int homeworkId);

    @Query(nativeQuery = true,value = "select count(*) from studenthomework where handintime> (select handintime from studenthomework where studentid = ?1 and homeworkid=?2) and homeworkid=?2")
    Integer getStudentHandinRank(String studentId,int homeworkId);

    @Query(nativeQuery = true,value = "select count(distinct homeworkid) from studenthomework where courseid=?1")
    Integer getCourseHomeworkNum(int courseId);

    @Query(nativeQuery = true,value = "select count(distinct homeworkid) from studenthomework where courseid=?2 and studentid=?1 and score <> -1")
    Integer getStudentHomeworkNum(String studentId,int courseId);
}
