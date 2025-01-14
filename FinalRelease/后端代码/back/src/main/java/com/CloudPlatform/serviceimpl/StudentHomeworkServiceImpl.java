package com.CloudPlatform.serviceimpl;

import com.CloudPlatform.config.PicReinforce;
import com.CloudPlatform.dao.StudentHomeworkDao;
import com.CloudPlatform.dao.TeacherHomeworkDao;
import com.CloudPlatform.entity.StudentHomework;
import com.CloudPlatform.entity.StudentStat;
import com.CloudPlatform.entity.TeacherHomework;
import com.CloudPlatform.service.StudentHomeworkService;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import com.CloudPlatform.config.PicOssUrl;


import java.io.*;
import java.nio.file.Files;
import java.util.*;


import static java.lang.Double.parseDouble;

@Service
public class StudentHomeworkServiceImpl implements StudentHomeworkService {
    @Autowired
    private StudentHomeworkDao studenthomeworkDao;
    @Autowired
    private TeacherHomeworkDao teacherHomeworkDao;

    @Override
    public List<StudentHomework> getStudentHomeworkAll(String studentId) {
        return studenthomeworkDao.findAll(studentId);
    }

    @Override
    public List<StudentHomework> getStudentMistakenHomework(String studentId) {
        List<StudentHomework> studentHomeworkList = studenthomeworkDao.findAll(studentId);
        List<StudentHomework> res = new ArrayList<>();
        for (StudentHomework studentHomework : studentHomeworkList) {
            if (studentHomework.getScore() != null && studentHomework.getScore() < 100) {
                res.add(studentHomework);
            }
        }
        return res;
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfCourse(String studentId, int courseId) {
        return studenthomeworkDao.findAllOfCourse(studentId, courseId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomework(int homeworkId) {
        return studenthomeworkDao.findAllOfHomework(homeworkId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomeworkNoMongo(int homeworkId) {
        return studenthomeworkDao.findAllOfHomeworkNoMongo(homeworkId);
    }

    @Override
    public StudentHomework getStudentHomeworkOne(String studentId, int homeworkId) {
        StudentHomework studentHomework = studenthomeworkDao.findOne(studentId, homeworkId);
        if (studentHomework.getUpload() == null){
            return studentHomework;
        }

        String[] path = studentHomework.getUpload().split(",");
        List fileList = new ArrayList<>();
        File file = null;
        for (String filepath : path) {
            try {
                file = ResourceUtils.getFile(filepath);
                // 获取文件输入流
                FileInputStream inputStream = new FileInputStream(file);
                byte[] buffer=new byte[inputStream.available()];
                inputStream.read(buffer);
                fileList.add(new Base64().encodeToString(buffer));
            } catch (FileNotFoundException e) {
                System.out.println("文件不存在！");
            } catch (IOException e) {
                System.out.println("文件读取异常！");
            }
        }
        studentHomework.setFile(fileList);
        return studentHomework;
    }


    @Override
    public StudentHomework editStudentHomework(JSONObject object) {
        String Id = object.getString("id");
        int homeworkId = object.getInteger("homeworkId");
        int courseId = object.getInteger("courseId");
        String studentId = object.getString("studentId");
        String title = object.getString("title");
        String comment = object.getString("comment");
        String content = object.getString("content");
        int finishHomework = object.getInteger("finishHomework");
        int handinRank = object.getInteger("handinRank");
        String nickName = object.getString("nickName");
        String remarks = object.getString("remarks");
        String subject = object.getString("subject");
        String correct = object.getString("correct");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        Date handinTime = object.getDate("handinTime");
        String upload = object.getString("upload");
        JSONObject ocontent;
        ocontent = object.getJSONObject("ocontent");
        StudentHomework hw = new StudentHomework(studentId, homeworkId, courseId, nickName, handinTime,
                startTime, endTime, title, subject, content, correct, comment, remarks, Id, upload,
                finishHomework, handinRank, ocontent);
        return studenthomeworkDao.editOne(hw);
    }

    @Override
    public StudentHomework editStudentHomeworkByTeacher(JSONObject object) {
        int homeworkId = object.getInteger("homeworkId");
        String studentId = object.getString("studentId");
        String title = object.getString("title");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");

        StudentHomework hw = new StudentHomework(studentId, homeworkId,
                startTime, endTime, title);
        return studenthomeworkDao.editOneByTeacher(hw);
    }

    @Override
    public StudentHomework addStudentHomework(JSONObject object) {
        System.out.println(object);
        int courseId = object.getInteger("courseId");
        int homeworkId = object.getInteger("homeworkId");
        String studentId = object.getString("studentId");
        String title = object.getString("title");
        String nickName = object.getString("nickName");
        String subject = object.getString("subject");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        Date handinTime = object.getDate("handinTime");
        String upload = object.getString("upload");
        StudentHomework hw = new StudentHomework(homeworkId, courseId, studentId, title,
                startTime, endTime, nickName, subject, upload, null, null, null, null);
        return studenthomeworkDao.addOne(hw);
    }

    @Override
    public StudentHomework correctStudentHomework(JSONObject object) {
        String Id = object.getString("id");
        int homeworkId = object.getInteger("homeworkId");
        int courseId = object.getInteger("courseId");
        String studentId = object.getString("studentId");
        String title = object.getString("title");
        String comment = object.getString("comment");
        String content = object.getString("content");
        int finishHomework = object.getInteger("finishHomework");
        int handinRank = object.getInteger("handinRank");
        String nickName = object.getString("nickName");
        String remarks = object.getString("remarks");
        String subject = object.getString("subject");
        String correct = object.getString("correct");
        double score = object.getDouble("score");
        Date startTime = object.getDate("startTime");
        Date endTime = object.getDate("endTime");
        Date handinTime = object.getDate("handinTime");
        String upload = object.getString("upload");

        StudentHomework hw = new StudentHomework(studentId, homeworkId, courseId, nickName, handinTime,
                startTime, endTime, score, title, subject, content, correct, comment, remarks, Id, upload,
                finishHomework, handinRank);
        return studenthomeworkDao.editOne(hw);
    }

    @Override
    public void deleteStudentHomeworkAll(String studentId, int courseId) {
        studenthomeworkDao.deleteAll(studentId, courseId);
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllOfHomeworkPage(int homeworkId, Pageable p) {
        return studenthomeworkDao.findByHomeworkId(homeworkId, p);
    }

    @Override
    public double getAverage(int homeworkId) {
        double ave;
        double count = 0;
        double score = 0;
        List<StudentHomework> studentHomeworkList = studenthomeworkDao.findAllOfHomework(homeworkId);
        for (StudentHomework studentHomework : studentHomeworkList) {
            if (studentHomework.getScore() != null) {
                score += studentHomework.getScore();
                count++;
            }
        }
        ave = score / count;
        return ave;
    }

    @Override
    public void deleteStudentHomeworkOne(String studentId, int homeworkId) {
        studenthomeworkDao.deleteOne(studentId, homeworkId);
    }

    @Override
    public String upload(MultipartFile file, String userId) throws IOException {
        InputStream fis = file.getInputStream();
        byte[] bytes = FileCopyUtils.copyToByteArray(fis);
        String base64 = PicReinforce.Reinforce(bytes);
        String pathName = "/homework/" + userId + "/";//想要存储文件的地址
        String pname = file.getOriginalFilename();//获取文件名（包括后缀）
        FileOutputStream fos = null;
        try {
            File ffile = new File(pathName);
            if (!ffile.exists()) {//如果文件夹不存在
                ffile.mkdir();//创建文件夹
            }
            pathName += System.currentTimeMillis();
            pathName += pname;
            fos = new FileOutputStream(pathName);
            fos.write(file.getBytes());// 写入文件
//            String[] arg = new String[0];
//            arg[0] = pathName;
//            PicOssUrl.main(arg);
            return pathName;
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public StudentStat getStudentStatistics(String studentId, int courseId, int time) {
        int finishHomework = studenthomeworkDao.getStudentHomeworkNum(studentId, courseId);
        int courseHomeworkNum = studenthomeworkDao.getCourseHomeworkNum(courseId);
        int ongoingHomework = 0;
        int failedHomework = 0;
        List<StudentHomework> studentHomeworkList = studenthomeworkDao.findAllOfCourse(studentId, courseId);
        float meanScore = 0, recentMeanScore = 0;
        int recentMeanScoreNum = 0;
        List<Integer> homeworkRankChange = new ArrayList<>();
        List<Double> homeworkScoreChange = new ArrayList<>();
        List<Integer> handinChange = new ArrayList<>();
        List<Integer> ddlChange = new ArrayList<>();
        for (StudentHomework studentHomework : studentHomeworkList) {
            //还未批改的作业不进入统计
            if (studentHomework.getScore() == null) {
                if (studentHomework.getHandinTime() == null) {
                    finishHomework--;
                }
                courseHomeworkNum--;
                ongoingHomework++;
                continue;
            }
            //处理缺交的作业
            if (studentHomework.getScore() == -1) {
                System.out.println("sad");
                failedHomework++;
                studentHomework.setScore(parseDouble("0"));
            }
            meanScore += studentHomework.getScore();
            if (recentMeanScoreNum < time) {
                recentMeanScoreNum++;
                recentMeanScore += studentHomework.getScore();
                Integer rank = studenthomeworkDao.getStudentHomeworkRank(studentId, studentHomework.getHomeworkId()) + 1;
                homeworkRankChange.add(rank);
                homeworkScoreChange.add(studentHomework.getScore());
                Date handinTime = studentHomework.getHandinTime();
                Date startTime = studentHomework.getStartTime();
                Date endTime = studentHomework.getEndTime();
                int start2hand = (handinTime.getYear() - startTime.getYear()) * 24 * 60 * 30 * 12 + (handinTime.getMonth() - startTime.getMonth()) * 24 * 60 * 30 + (handinTime.getDay() - startTime.getDay()) * 24 * 60 + (handinTime.getHours() - startTime.getHours()) * 60 + (handinTime.getMinutes() - startTime.getMinutes());
                if (start2hand < 0) start2hand = 299;
                handinChange.add(start2hand);
                int hand2end = (endTime.getYear() - handinTime.getYear()) * 24 * 60 * 30 * 12 + (endTime.getMonth() - handinTime.getMonth()) * 24 * 60 * 30 + (endTime.getDay() - handinTime.getDay()) * 24 * 60 + (endTime.getHours() - handinTime.getHours()) * 60 + (endTime.getMinutes() - handinTime.getMinutes());
                if (hand2end < 0) hand2end = 299;
                ddlChange.add(hand2end);
            }
        }
        meanScore = meanScore / courseHomeworkNum;
        recentMeanScore = recentMeanScore / recentMeanScoreNum;
        return new StudentStat(finishHomework, ongoingHomework, failedHomework, meanScore, recentMeanScore, homeworkRankChange, homeworkScoreChange, handinChange, ddlChange);
    }

    @Override
    public void autoGrading(int homeworkId) {
        TeacherHomework homework = teacherHomeworkDao.findOne(homeworkId);
        List<StudentHomework> studentHomeworkList = studenthomeworkDao.findAllOfHomework(homeworkId);
        if (homework.getType().equals("主观题")) {
            System.out.println("Invalid auto grading type");
            return;
        }
        JSONObject syllabus = homework.getSyllabus();
        int altogetherQuestions = syllabus.getInteger("chapterNum");
        int correct = 0;
        for (StudentHomework studentHomework : studentHomeworkList) {
            correct = 0;
            if(studentHomework.getOcontent()==null){
                studentHomework.setScore(0.0);
                studentHomework.setCorrect("");
                studentHomework.setComment("得分为"+0.0);
                System.out.println(0.0);
                studenthomeworkDao.editOne(studentHomework);
                continue;
            }
            JSONArray ocontents = studentHomework.getOcontent().getJSONArray("array");
            for(int i =0;i<altogetherQuestions;++i){
                String chapter = "chapter"+(i+1);
                String type = syllabus.getJSONObject(chapter).getString("type");
                if(type.equals("选择题")){
                    String answer = syllabus.getJSONObject(chapter).getString("answer");
                    String studentAnswer = ocontents.getJSONArray(i).getString(0);
                    if(answer.equals(studentAnswer)){
                        correct++;
                    }
                }else{
                    JSONArray answers = syllabus.getJSONObject(chapter).getJSONArray("content");
                    JSONArray studentAnswers = ocontents.getJSONArray(i);
                    boolean yes = true;
                    for(int j=0;j<answers.size();++j){
                        String answer = answers.getString(j);
                        String studentAnswer = studentAnswers.getString(j);
                        if(!answer.equals(studentAnswer)){
                            yes = false;
                        }
                    }
                    if(yes){
                        correct++;
                    }
                }
            }
            double score = 100*correct/altogetherQuestions;
            studentHomework.setScore(score);
            studentHomework.setCorrect("");
            studentHomework.setComment("得分为"+score);
            System.out.println(score);
            studenthomeworkDao.editOne(studentHomework);
        }
    }

    @Override
    public List<StudentHomework> getStudentHomeworkAllPage(String studentId, Pageable p) {
        return studenthomeworkDao.findAllPage(studentId, p);
    }

    @Override
    public List<StudentHomework> getPageHomeworkOfStudentsNoMongo(int homeworkId, Pageable p) {
        return studenthomeworkDao.findAllOfHomeworkNoMongoPage(homeworkId,p);
    }
}
