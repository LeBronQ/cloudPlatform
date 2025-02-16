package com.CloudPlatform.entity;

import com.CloudPlatform.utils.multikeys.StudentHomeworkMultiKeys;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Transactional

public class StudentStat {
    private int finishHomework;
    private int ongoingHomework;
    private int failedHomework;
    private float meanScore;
    private float recentMeanScore;
    private List<Integer> homeworkRankChange;
    private List<Double> homeworkScoreChange;
    private List<Integer> handinChange;
    private List<Integer> ddlChange;
}
