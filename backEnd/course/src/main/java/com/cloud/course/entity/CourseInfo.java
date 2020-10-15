package com.cloud.course.entity;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "courseInfo")
@AllArgsConstructor
@NoArgsConstructor
public class CourseInfo {
    @Id
    private int id;
    private String detail;
    private String introduction;
    private JSONObject syllabus;
    private String textbook;
}
