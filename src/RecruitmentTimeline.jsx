import React, { useState, useRef, useEffect } from 'react';

const RecruitmentTimeline = () => {
  const today = new Date('2024-03-20');
  
  const generateDates = () => {
    const dates = [];
    const start = new Date('2024-03-01');
    const end = new Date('2024-05-31');
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };
  
  const dates = generateDates();
  const todayRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showAIRecommendation, setShowAIRecommendation] = useState(true);
  const [showTodayTasks, setShowTodayTasks] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isLeftColumnCollapsed, setIsLeftColumnCollapsed] = useState(false);

  const todayIndex = dates.findIndex(d =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );

  useEffect(() => {
    if (scrollContainerRef.current && todayIndex >= 0) {
      const cellWidth = 28;
      const leftColumnWidth = isLeftColumnCollapsed ? 48 : 208;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const visibleDateAreaWidth = containerWidth - leftColumnWidth;
      const todayPosition = todayIndex * cellWidth + cellWidth / 2;
      const scrollPosition = todayPosition - visibleDateAreaWidth / 2;
      scrollContainerRef.current.scrollLeft = Math.max(0, scrollPosition);
    }
  }, [todayIndex, isLeftColumnCollapsed]);

  const [recruitments, setRecruitments] = useState([
    {
      id: 1,
      name: '상반기 신입 공채',
      type: '신입',
      headcount: 30,
      applicants: 1247,
      stages: [
        { name: '공고', start: '2024-03-04', end: '2024-03-15', checklist: [
          { id: 1, text: 'JD 작성 및 확정', checked: true },
          { id: 2, text: '채용 공고 등록', checked: true },
          { id: 3, text: '채용 채널 배포', checked: true },
          { id: 4, text: '사내 추천 공지', checked: true },
        ]},
        { name: '서류', start: '2024-03-16', end: '2024-03-25', checklist: [
          { id: 1, text: '지원서 접수 마감', checked: true },
          { id: 2, text: '서류 검토 기준 확정', checked: true },
          { id: 3, text: '1차 서류 스크리닝', checked: true },
          { id: 4, text: '적격자 분류 완료', checked: false },
          { id: 5, text: '면접 대상자 확정', checked: false },
        ]},
        { name: '1차면접', start: '2024-03-27', end: '2024-04-05', checklist: [
          { id: 1, text: '면접관 배정', checked: false },
          { id: 2, text: '면접 일정 조율', checked: false },
          { id: 3, text: '면접 장소 준비', checked: false },
          { id: 4, text: '면접 진행', checked: false },
          { id: 5, text: '면접 평가서 취합', checked: false },
        ]},
        { name: '2차면접', start: '2024-04-08', end: '2024-04-12', checklist: [
          { id: 1, text: '임원 면접관 확보', checked: false },
          { id: 2, text: '면접 진행', checked: false },
          { id: 3, text: '최종 평가 회의', checked: false },
        ]},
        { name: '최종', start: '2024-04-15', end: '2024-04-17', checklist: [
          { id: 1, text: '합격자 통보', checked: false },
          { id: 2, text: '처우 협의', checked: false },
          { id: 3, text: '입사일 확정', checked: false },
        ]}
      ],
      owner: '김채용',
      isAIRecommendation: false
    },
    {
      id: 2,
      name: '하계 인턴십',
      type: '인턴',
      headcount: 15,
      applicants: 523,
      stages: [
        { name: '공고', start: '2024-03-11', end: '2024-03-20', checklist: [
          { id: 1, text: 'JD 작성 및 확정', checked: true },
          { id: 2, text: '채용 공고 등록', checked: true },
          { id: 3, text: '채용 채널 배포', checked: true },
          { id: 4, text: '사내 추천 공지', checked: false },
        ]},
        { name: '서류', start: '2024-03-21', end: '2024-03-28', checklist: [
          { id: 1, text: '지원서 접수 마감', checked: false },
          { id: 2, text: '서류 검토', checked: false },
          { id: 3, text: '면접 대상자 확정', checked: false },
        ]},
        { name: '면접', start: '2024-04-01', end: '2024-04-10', checklist: [
          { id: 1, text: '면접관 배정', checked: false },
          { id: 2, text: '면접 진행', checked: false },
          { id: 3, text: '합격자 선정', checked: false },
        ]},
        { name: '최종', start: '2024-04-12', end: '2024-04-15', checklist: [
          { id: 1, text: '합격자 통보', checked: false },
          { id: 2, text: '입사일 확정', checked: false },
        ]}
      ],
      owner: '이인사',
      isAIRecommendation: false
    },
    {
      id: 3,
      name: '개발팀 경력',
      type: '경력',
      headcount: 3,
      applicants: 45,
      stages: [
        { name: '서류', start: '2024-03-10', end: '2024-03-18', checklist: [
          { id: 1, text: '서류 검토', checked: true },
          { id: 2, text: '면접 대상자 확정', checked: true },
        ]},
        { name: '1차면접', start: '2024-03-19', end: '2024-03-22', checklist: [
          { id: 1, text: '면접관 배정', checked: true },
          { id: 2, text: '면접 진행', checked: false },
          { id: 3, text: '평가서 취합', checked: false },
        ]},
        { name: '2차면접', start: '2024-03-25', end: '2024-03-27', checklist: [
          { id: 1, text: '임원 면접', checked: false },
          { id: 2, text: '최종 선정', checked: false },
        ]},
        { name: '처우협의', start: '2024-03-28', end: '2024-04-01', checklist: [
          { id: 1, text: '연봉 협상', checked: false },
          { id: 2, text: '입사일 조율', checked: false },
        ]}
      ],
      owner: '박매니저',
      isAIRecommendation: false
    },
    {
      id: 4,
      name: '마케팅팀 경력',
      type: '경력',
      headcount: 2,
      applicants: 38,
      stages: [
        { name: '공고', start: '2024-03-14', end: '2024-03-19', checklist: [
          { id: 1, text: 'JD 작성', checked: true },
          { id: 2, text: '공고 등록', checked: true },
          { id: 3, text: '채널 배포', checked: false },
        ]},
        { name: '서류', start: '2024-03-25', end: '2024-04-01', checklist: [
          { id: 1, text: '서류 검토', checked: false },
          { id: 2, text: '면접 대상 확정', checked: false },
        ]},
        { name: '면접', start: '2024-04-03', end: '2024-04-10', checklist: [
          { id: 1, text: '면접 진행', checked: false },
          { id: 2, text: '합격자 선정', checked: false },
        ]},
        { name: '최종', start: '2024-04-12', end: '2024-04-15', checklist: [
          { id: 1, text: '합격자 통보', checked: false },
          { id: 2, text: '처우 협의', checked: false },
        ]}
      ],
      owner: '이인사',
      isAIRecommendation: false
    }
  ]);

  // AI 추천 일정
  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 'ai-1',
      name: '하반기 신입 공채',
      type: '신입',
      headcount: 25,
      stages: [
        { name: '공고', start: '2024-03-25', end: '2024-04-03' },
        { name: '서류', start: '2024-04-04', end: '2024-04-12' },
        { name: '1차면접', start: '2024-04-15', end: '2024-04-22' },
        { name: '2차면접', start: '2024-04-24', end: '2024-04-30' },
      ],
      analysis: {
        basedOn: '상반기 신입 공채',
        avgDuration: 45,
        conflictFree: true,
        resourceAvailable: ['김채용', '이인사'],
        reasoning: [
          '상반기 공채 서류 마감(3/25) 직후 시작 가능',
          '3월 25일~4월 3일: 타 전형 면접 없음',
          '김채용, 이인사 담당자 가용',
          '과거 데이터 기준 신입 공채 평균 45일 소요'
        ]
      }
    },
    {
      id: 'ai-2',
      name: 'QA팀 경력 채용',
      type: '경력',
      headcount: 2,
      stages: [
        { name: '공고', start: '2024-03-22', end: '2024-03-28' },
        { name: '서류', start: '2024-03-29', end: '2024-04-05' },
        { name: '면접', start: '2024-04-08', end: '2024-04-15' },
        { name: '최종', start: '2024-04-16', end: '2024-04-19' },
      ],
      analysis: {
        basedOn: '개발팀 경력 채용 패턴',
        avgDuration: 30,
        conflictFree: true,
        resourceAvailable: ['박매니저'],
        reasoning: [
          '개발팀 경력(3명) 입사 시점과 연계',
          '3월 22일 이후 면접 일정 여유',
          '박매니저 가용',
          '경력 채용 평균 30일 소요'
        ]
      }
    }
  ]);

  const [hoveredStage, setHoveredStage] = useState(null);
  const [fixedStage, setFixedStage] = useState(null);
  const [selectedAIRec, setSelectedAIRec] = useState(null);

  // AI 오늘 할 일 생성
  const generateTodayTasks = () => {
    const tasks = [];
    
    recruitments.forEach(r => {
      r.stages.forEach((stage, stageIdx) => {
        const startDate = new Date(stage.start);
        const endDate = new Date(stage.end);
        const isCurrentStage = startDate <= today && endDate >= today;
        const isOverdue = endDate < today;
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        
        const uncheckedItems = stage.checklist.filter(item => !item.checked);
        
        if (uncheckedItems.length > 0) {
          if (isOverdue) {
            uncheckedItems.forEach(item => {
              tasks.push({
                id: `${r.id}-${stageIdx}-${item.id}`,
                recruitmentId: r.id,
                stageIdx,
                checklistId: item.id,
                recruitment: r.name,
                stage: stage.name,
                task: item.text,
                urgent: 'overdue',
                daysLeft: daysLeft,
                reason: `기한 ${Math.abs(daysLeft)}일 초과`
              });
            });
          }
          else if (daysLeft === 0) {
            uncheckedItems.forEach(item => {
              tasks.push({
                id: `${r.id}-${stageIdx}-${item.id}`,
                recruitmentId: r.id,
                stageIdx,
                checklistId: item.id,
                recruitment: r.name,
                stage: stage.name,
                task: item.text,
                urgent: 'today',
                daysLeft: 0,
                reason: '오늘 마감'
              });
            });
          }
          else if (isCurrentStage && daysLeft <= 3) {
            uncheckedItems.forEach(item => {
              tasks.push({
                id: `${r.id}-${stageIdx}-${item.id}`,
                recruitmentId: r.id,
                stageIdx,
                checklistId: item.id,
                recruitment: r.name,
                stage: stage.name,
                task: item.text,
                urgent: 'soon',
                daysLeft: daysLeft,
                reason: `D-${daysLeft}`
              });
            });
          }
          else if (isCurrentStage) {
            uncheckedItems.slice(0, 2).forEach(item => {
              tasks.push({
                id: `${r.id}-${stageIdx}-${item.id}`,
                recruitmentId: r.id,
                stageIdx,
                checklistId: item.id,
                recruitment: r.name,
                stage: stage.name,
                task: item.text,
                urgent: 'normal',
                daysLeft: daysLeft,
                reason: `D-${daysLeft}`
              });
            });
          }
        }
      });
    });

    return tasks.sort((a, b) => {
      const urgentOrder = { overdue: 0, today: 1, soon: 2, normal: 3 };
      if (urgentOrder[a.urgent] !== urgentOrder[b.urgent]) {
        return urgentOrder[a.urgent] - urgentOrder[b.urgent];
      }
      return a.daysLeft - b.daysLeft;
    });
  };

  const todayTasks = generateTodayTasks();

  const getDateIndex = (dateStr) => {
    const target = new Date(dateStr);
    return dates.findIndex(d => 
      d.getFullYear() === target.getFullYear() &&
      d.getMonth() === target.getMonth() &&
      d.getDate() === target.getDate()
    );
  };

  const getDayName = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  const isWeekend = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isMonthStart = (date, idx) => {
    return date.getDate() === 1 || idx === 0;
  };

  const getProgress = (checklist) => {
    if (!checklist) return { total: 0, checked: 0, percent: 0 };
    const total = checklist.length;
    const checked = checklist.filter(item => item.checked).length;
    return { total, checked, percent: Math.round((checked / total) * 100) };
  };

  const getStageStatus = (stage) => {
    if (!stage.checklist) return 'upcoming';
    
    const endDate = new Date(stage.end);
    const startDate = new Date(stage.start);
    const progress = getProgress(stage.checklist);
    
    if (progress.percent === 100) return 'completed';
    if (endDate < today && progress.percent < 100) return 'overdue';
    if (startDate <= today && endDate >= today) return 'inProgress';
    if (startDate > today) return 'upcoming';
    
    return 'inProgress';
  };

  const getStageStyle = (stage) => {
    const status = getStageStatus(stage);
    
    switch(status) {
      case 'completed':
        return { bg: 'bg-emerald-200', text: 'text-emerald-700', icon: '✓', opacity: 'opacity-60' };
      case 'overdue':
        return { bg: 'bg-red-500', text: 'text-white', icon: '⚠', opacity: '' };
      case 'inProgress':
        return { bg: 'bg-blue-500', text: 'text-white', icon: null, opacity: '' };
      case 'upcoming':
        return { bg: 'bg-gray-300', text: 'text-gray-500', icon: null, opacity: 'opacity-70' };
      default:
        return { bg: 'bg-gray-300', text: 'text-gray-500', icon: null, opacity: 'opacity-70' };
    }
  };

  const getProgressBarColor = (stage) => {
    const status = getStageStatus(stage);
    switch(status) {
      case 'completed': return 'bg-emerald-300';
      case 'overdue': return 'bg-red-300';
      case 'inProgress': return 'bg-blue-300';
      default: return 'bg-gray-200';
    }
  };

  const toggleChecklist = (recruitmentId, stageIdx, checklistId) => {
    setRecruitments(prev => prev.map(r => {
      if (r.id === recruitmentId) {
        const newStages = [...r.stages];
        newStages[stageIdx] = {
          ...newStages[stageIdx],
          checklist: newStages[stageIdx].checklist.map(item => 
            item.id === checklistId ? { ...item, checked: !item.checked } : item
          )
        };
        return { ...r, stages: newStages };
      }
      return r;
    }));
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // 통계 계산
  const getStats = () => {
    let completed = 0, inProgress = 0, overdue = 0, upcoming = 0;
    recruitments.forEach(r => {
      r.stages.forEach(s => {
        const status = getStageStatus(s);
        if (status === 'completed') completed++;
        if (status === 'inProgress') inProgress++;
        if (status === 'overdue') overdue++;
        if (status === 'upcoming') upcoming++;
      });
    });
    return { completed, inProgress, overdue, upcoming };
  };

  const stats = getStats();

  // 담당자별 업무량
  const getOwnerLoad = () => {
    const load = {};
    recruitments.forEach(r => {
      if (!load[r.owner]) load[r.owner] = { total: 0, inProgress: 0, overdue: 0 };
      load[r.owner].total++;
      r.stages.forEach(s => {
        const status = getStageStatus(s);
        if (status === 'inProgress') load[r.owner].inProgress++;
        if (status === 'overdue') load[r.owner].overdue++;
      });
    });
    return load;
  };

  const ownerLoad = getOwnerLoad();

  // 7일 내 마감
  const getUpcomingDeadlines = () => {
    const deadlines = [];
    recruitments.forEach(r => {
      r.stages.forEach(stage => {
        const status = getStageStatus(stage);
        if (status === 'inProgress' || status === 'overdue') {
          const endDate = new Date(stage.end);
          const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
          if (diff <= 7) {
            deadlines.push({
              recruitment: r.name,
              stage: stage.name,
              diff,
              status
            });
          }
        }
      });
    });
    return deadlines.sort((a, b) => a.diff - b.diff);
  };

  const upcomingDeadlines = getUpcomingDeadlines();

  // AI 추천 수락
  const acceptAIRecommendation = (rec) => {
    const newRecruitment = {
      id: Date.now(),
      name: rec.name.replace(' (AI 추천)', ''),
      type: rec.type,
      headcount: rec.headcount,
      applicants: 0,
      stages: rec.stages.map(s => ({
        ...s,
        checklist: getDefaultChecklist(s.name)
      })),
      owner: rec.analysis.resourceAvailable[0],
      isAIRecommendation: false
    };
    
    setRecruitments(prev => [...prev, newRecruitment]);
    setAiRecommendations(prev => prev.filter(r => r.id !== rec.id));
    setSelectedAIRec(null);
  };

  const getDefaultChecklist = (stageName) => {
    const templates = {
      '공고': [
        { id: 1, text: 'JD 작성 및 확정', checked: false },
        { id: 2, text: '채용 공고 등록', checked: false },
        { id: 3, text: '채용 채널 배포', checked: false },
        { id: 4, text: '사내 추천 공지', checked: false },
      ],
      '서류': [
        { id: 1, text: '지원서 접수 마감', checked: false },
        { id: 2, text: '서류 검토', checked: false },
        { id: 3, text: '면접 대상자 확정', checked: false },
      ],
      '1차면접': [
        { id: 1, text: '면접관 배정', checked: false },
        { id: 2, text: '면접 일정 조율', checked: false },
        { id: 3, text: '면접 진행', checked: false },
        { id: 4, text: '평가서 취합', checked: false },
      ],
      '2차면접': [
        { id: 1, text: '임원 면접', checked: false },
        { id: 2, text: '최종 평가', checked: false },
      ],
      '면접': [
        { id: 1, text: '면접관 배정', checked: false },
        { id: 2, text: '면접 진행', checked: false },
        { id: 3, text: '합격자 선정', checked: false },
      ],
      '최종': [
        { id: 1, text: '합격자 통보', checked: false },
        { id: 2, text: '처우 협의', checked: false },
        { id: 3, text: '입사일 확정', checked: false },
      ],
      '처우협의': [
        { id: 1, text: '연봉 협상', checked: false },
        { id: 2, text: '입사일 조율', checked: false },
      ],
    };
    return templates[stageName] || [{ id: 1, text: '작업 진행', checked: false }];
  };

  const dismissAIRecommendation = (recId) => {
    setAiRecommendations(prev => prev.filter(r => r.id !== recId));
    setSelectedAIRec(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4" onMouseMove={handleMouseMove}>
      <div className="max-w-full mx-auto">
        
        {/* 프로필 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-3 sm:p-4 mb-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-md">
                👨‍💼
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold">개발자 김남빈</h1>
                <p className="text-blue-100 text-xs sm:text-sm">nambin96@naver.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm sm:text-lg font-bold">AI 기반 채용 관리 시스템</div>
              <div className="text-blue-100 text-xs sm:text-sm">포트폴리오 프로젝트</div>
            </div>
          </div>
        </div>

        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">채용 전형 타임라인</h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일 ({getDayName(today)}) 기준
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={showAIRecommendation}
                onChange={(e) => setShowAIRecommendation(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span>🤖 AI 추천 표시</span>
            </label>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-emerald-500"></div>
                <span>완료</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-blue-500"></div>
                <span>진행중</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded bg-red-500"></div>
                <span>기한초과</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-400 animate-pulse"></div>
                <span>AI추천</span>
              </div>
            </div>
          </div>
        </div>

        {/* 상단 통계 카드 - 컴팩트 */}
        <div className="grid grid-cols-2 gap-2 mb-4 sm:flex sm:gap-2">
          <div className="bg-white rounded-lg shadow px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs text-gray-500">7일 내 마감</span>
            <span className="text-lg font-bold text-orange-600">{upcomingDeadlines.length}</span>
          </div>
          <div className="bg-white rounded-lg shadow px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs text-gray-500">완료</span>
            <span className="text-lg font-bold text-emerald-600">{stats.completed}</span>
          </div>
          <div className="bg-white rounded-lg shadow px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs text-gray-500">진행중</span>
            <span className="text-lg font-bold text-blue-600">{stats.inProgress}</span>
          </div>
          <div className="bg-white rounded-lg shadow px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs text-gray-500">기한초과</span>
            <span className="text-lg font-bold text-red-600">{stats.overdue}</span>
          </div>
          <div className="bg-white rounded-lg shadow px-3 py-2 flex flex-col sm:flex-row sm:items-center sm:gap-3 col-span-2 sm:col-span-1">
            <span className="text-xs text-gray-500">담당자</span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.entries(ownerLoad).map(([owner, load]) => (
                <span key={owner} className="text-xs">
                  {owner}
                  {load.overdue > 0 && <span className="text-red-600 ml-1">⚠{load.overdue}</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI 오늘 할 일 */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🤖</span>
            <h2 className="font-bold text-gray-800">AI가 정리한 오늘 할 일</h2>
          </div>
          
          {isLoadingTasks ? (
            <div className="text-center py-8 relative overflow-hidden">
              <div className="relative inline-block">
                <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                <span className="absolute -top-2 -left-2 text-xl animate-bounce" style={{animationDelay: '0ms'}}>✨</span>
                <span className="absolute -top-1 -right-3 text-lg animate-bounce" style={{animationDelay: '150ms'}}>🪄</span>
                <span className="absolute -bottom-2 -left-3 text-lg animate-bounce" style={{animationDelay: '300ms'}}>⭐</span>
                <span className="absolute -bottom-1 -right-2 text-xl animate-bounce" style={{animationDelay: '450ms'}}>✨</span>
              </div>
              <p className="text-sm text-violet-600 mt-4 font-medium animate-pulse">AI가 마법을 부리는 중...</p>
            </div>
          ) : !showTodayTasks ? (
            <div className="text-center py-6">
              <button
                onClick={() => {
                  setIsLoadingTasks(true);
                  setTimeout(() => {
                    setIsLoadingTasks(false);
                    setShowTodayTasks(true);
                  }, 1500);
                }}
                className="group relative px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg animate-spin">✨</span>
                  </div>
                  <div className="text-left">
                    <div className="font-bold">AI로 오늘 할 일 분석</div>
                    <div className="text-xs text-white/70">우선순위를 자동으로 정리합니다</div>
                  </div>
                </div>
                <span className="absolute -top-1 -right-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">🪄</span>
              </button>
            </div>
          ) : todayTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              ✨ 오늘 처리할 긴급 업무가 없습니다!
            </div>
          ) : (
            <div className="space-y-2">
              {todayTasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all bg-gray-50 border border-gray-200 hover:bg-gray-100"
                  onClick={() => {
                    // 해당 전형의 stage를 선택하고 스크롤
                    const recruitment = recruitments.find(r => r.id === task.recruitmentId);
                    if (recruitment) {
                      setFixedStage({ 
                        recruitmentId: task.recruitmentId, 
                        stage: recruitment.stages[task.stageIdx], 
                        stageIdx: task.stageIdx 
                      });
                      // 해당 전형 행으로 스크롤
                      const element = document.getElementById(`recruitment-${task.recruitmentId}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => toggleChecklist(task.recruitmentId, task.stageIdx, task.checklistId)}
                  />
                  <span className={`text-xs font-bold px-2 py-1 rounded
                    ${task.urgent === 'overdue' || task.urgent === 'today' ? 'bg-gray-800 text-white' : 'bg-gray-400 text-white'}
                  `}>
                    {task.reason}
                  </span>
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">{task.recruitment}</span>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-gray-600">{task.stage}</span>
                    <span className="text-gray-400 mx-2">·</span>
                    <span className="text-gray-700">{task.task}</span>
                  </div>
                  <span className="text-gray-400 text-sm">→</span>
                </div>
              ))}
            </div>
          )}
          
          {showTodayTasks && !isLoadingTasks && todayTasks.length > 3 && (
            <div className="text-center mt-3 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              + {todayTasks.length - 3}개 더 보기
            </div>
          )}
        </div>

        {/* AI 추천 알림 배너 */}
        {showAIRecommendation && aiRecommendations.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-pulse">🤖</span>
              <span className="font-medium text-purple-800">
                AI가 {aiRecommendations.length}개의 새 채용 일정을 추천합니다
              </span>
              <span className="text-sm text-purple-600">
                - 타임라인에서 깜빡이는 보라색 항목을 클릭하세요
              </span>
            </div>
          </div>
        )}

        {/* 간트 차트 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto" ref={scrollContainerRef}>
            <div className="min-w-max">
              {/* 날짜 헤더 */}
              <div className="flex border-b sticky top-0 z-10 bg-white">
                <div className={`${isLeftColumnCollapsed ? 'w-12' : 'w-52'} flex-shrink-0 border-r p-2 font-medium text-sm bg-gray-50 sticky left-0 z-20 transition-all duration-300 flex items-center justify-between`}>
                  {!isLeftColumnCollapsed && <span>전형명</span>}
                  <button
                    onClick={() => setIsLeftColumnCollapsed(!isLeftColumnCollapsed)}
                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors text-gray-500"
                    title={isLeftColumnCollapsed ? '펼치기' : '접기'}
                  >
                    {isLeftColumnCollapsed ? '→' : '←'}
                  </button>
                </div>
                <div className="flex relative">
                  {dates.map((date, idx) => (
                    <div
                      key={idx}
                      ref={idx === todayIndex ? todayRef : null}
                      className={`w-7 text-center border-l flex flex-col items-center py-1
                        ${isWeekend(date) ? 'bg-gray-100' : ''}
                        ${idx === todayIndex ? 'bg-red-50' : ''}
                      `}
                    >
                      {isMonthStart(date, idx) && (
                        <span className="text-xs font-bold text-gray-700 absolute -top-0">
                          {date.getMonth() + 1}월
                        </span>
                      )}
                      <span className={`text-xs mt-2 ${
                        idx === todayIndex ? 'font-bold text-red-600' :
                        isWeekend(date) ? 'text-red-400' : 'text-gray-500'
                      }`}>
                        {date.getDate()}
                      </span>
                      <span className={`text-xs ${
                        idx === todayIndex ? 'font-bold text-red-600' :
                        isWeekend(date) ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {getDayName(date)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 기존 전형 */}
              {recruitments.map(recruitment => (
                <div
                  key={recruitment.id}
                  id={`recruitment-${recruitment.id}`}
                  className="flex border-b hover:bg-gray-50"
                >
                  <div className={`${isLeftColumnCollapsed ? 'w-12' : 'w-52'} flex-shrink-0 p-2 border-r bg-white sticky left-0 z-10 transition-all duration-300`}>
                    {isLeftColumnCollapsed ? (
                      <div className="font-medium text-xs text-center" title={recruitment.name}>
                        {recruitment.name.slice(0, 2)}
                      </div>
                    ) : (
                      <>
                        <div className="font-medium text-sm truncate">{recruitment.name}</div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded">{recruitment.type}</span>
                          <span>{recruitment.headcount}명</span>
                          <span>· {recruitment.owner}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex relative">
                    {dates.map((date, idx) => (
                      <div
                        key={idx}
                        className={`w-7 h-16 border-l
                          ${isWeekend(date) ? 'bg-gray-50' : ''}
                          ${idx === todayIndex ? 'bg-red-50' : ''}
                        `}
                      ></div>
                    ))}

                    {todayIndex >= 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-[5]"
                        style={{ left: `${todayIndex * 28 + 14}px` }}
                      ></div>
                    )}

                    {recruitment.stages.map((stage, stageIdx) => {
                      const startIdx = getDateIndex(stage.start);
                      const endIdx = getDateIndex(stage.end);
                      const style = getStageStyle(stage);
                      const progress = getProgress(stage.checklist);
                      const status = getStageStatus(stage);
                      
                      if (startIdx === -1 || endIdx === -1) return null;
                      const barWidth = (endIdx - startIdx + 1) * 28 - 4;

                      return (
                        <div
                          key={stageIdx}
                          className={`absolute h-10 top-3 rounded cursor-pointer transition-all
                            ${style.bg} ${style.text} ${style.opacity}
                            ${status === 'completed' ? '' : ''}
                            ${status === 'overdue' ? 'ring-2 ring-red-400 ring-offset-1 animate-pulse' : ''}
                            ${status === 'inProgress' ? 'ring-2 ring-blue-400 ring-offset-1 shadow-lg' : ''}
                            ${fixedStage?.recruitmentId === recruitment.id && fixedStage?.stageIdx === stageIdx 
                              ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
                          `}
                          style={{
                            left: `${startIdx * 28 + 2}px`,
                            width: `${barWidth}px`
                          }}
                          onMouseEnter={() => !fixedStage && setHoveredStage({ recruitment, stage, stageIdx })}
                          onMouseLeave={() => !fixedStage && setHoveredStage(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (fixedStage?.recruitmentId === recruitment.id && fixedStage?.stageIdx === stageIdx) {
                              setFixedStage(null);
                            } else {
                              setFixedStage({ recruitmentId: recruitment.id, stage, stageIdx });
                              setHoveredStage(null);
                            }
                          }}
                        >
                          <div 
                            className={`absolute bottom-0 left-0 h-1.5 rounded-b ${getProgressBarColor(stage)}`}
                            style={{ width: `${progress.percent}%` }}
                          ></div>
                          
                          <div className="flex items-center justify-between h-full px-2">
                            <div className="flex items-center gap-1 truncate">
                              {style.icon && <span>{style.icon}</span>}
                              <span className="text-xs font-medium truncate">{stage.name}</span>
                            </div>
                            {progress.total > 0 && (
                              <span className="text-xs opacity-80">
                                {progress.checked}/{progress.total}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* AI 추천 전형 */}
              {showAIRecommendation && aiRecommendations.map(rec => (
                <div
                  key={rec.id}
                  className="flex border-b bg-purple-50 hover:bg-purple-100 cursor-pointer"
                  onClick={() => setSelectedAIRec(rec)}
                >
                  <div className={`${isLeftColumnCollapsed ? 'w-12' : 'w-52'} flex-shrink-0 p-2 border-r bg-purple-50 sticky left-0 z-10 transition-all duration-300`}>
                    {isLeftColumnCollapsed ? (
                      <div className="flex items-center justify-center" title={`(AI추천) ${rec.name}`}>
                        <span className="animate-pulse text-sm">🤖</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="animate-pulse">🤖</span>
                          <div className="font-medium text-sm truncate text-purple-800">(AI추천) {rec.name}</div>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-purple-600">
                          <span className="px-1.5 py-0.5 bg-purple-200 rounded">{rec.type}</span>
                          <span>{rec.headcount}명</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex relative">
                    {dates.map((date, idx) => (
                      <div
                        key={idx}
                        className={`w-7 h-16 border-l
                          ${isWeekend(date) ? 'bg-purple-100/50' : ''}
                          ${idx === todayIndex ? 'bg-red-50' : ''}
                        `}
                      ></div>
                    ))}

                    {todayIndex >= 0 && (
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-[5]"
                        style={{ left: `${todayIndex * 28 + 14}px` }}
                      ></div>
                    )}

                    {rec.stages.map((stage, stageIdx) => {
                      const startIdx = getDateIndex(stage.start);
                      const endIdx = getDateIndex(stage.end);
                      
                      if (startIdx === -1 || endIdx === -1) return null;
                      const barWidth = (endIdx - startIdx + 1) * 28 - 4;

                      return (
                        <div
                          key={stageIdx}
                          className="absolute h-10 top-3 rounded bg-purple-400 text-white 
                            animate-pulse shadow-lg border-2 border-purple-300 border-dashed"
                          style={{
                            left: `${startIdx * 28 + 2}px`,
                            width: `${barWidth}px`
                          }}
                        >
                          <div className="flex items-center justify-center h-full px-1">
                            <span className="text-xs font-medium truncate">(AI추천) {stage.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 호버 툴팁 */}
        {hoveredStage && !fixedStage && (
          <div 
            className="fixed bg-white border shadow-lg rounded-lg p-3 z-50 w-64"
            style={{ 
              left: `${mousePos.x + 15}px`, 
              top: `${mousePos.y + 15}px`,
              pointerEvents: 'none'
            }}
          >
            <div className="font-medium text-sm mb-1">{hoveredStage.recruitment.name}</div>
            <div className="text-xs text-gray-500 mb-2">
              {hoveredStage.stage.name} · {hoveredStage.stage.start.slice(5)} ~ {hoveredStage.stage.end.slice(5)}
            </div>
            <div className="text-xs text-gray-400 mb-2">클릭하여 체크리스트 수정</div>
            <div className="space-y-1">
              {hoveredStage.stage.checklist?.map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-xs">
                  <span className={item.checked ? 'text-emerald-500' : 'text-gray-400'}>
                    {item.checked ? '☑' : '☐'}
                  </span>
                  <span className={item.checked ? 'text-gray-400 line-through' : ''}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 고정된 체크리스트 패널 */}
        {fixedStage && (
          <div 
            className="fixed bg-white border-2 border-yellow-400 shadow-xl rounded-lg p-4 z-50 w-72"
            style={{ right: '20px', top: '100px' }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">
                  {recruitments.find(r => r.id === fixedStage.recruitmentId)?.name}
                </div>
                <div className="text-sm text-gray-500">
                  {fixedStage.stage.name} 단계
                </div>
              </div>
              <button 
                onClick={() => setFixedStage(null)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
              {fixedStage.stage.start.slice(5)} ~ {fixedStage.stage.end.slice(5)}
            </div>

            {(() => {
              const currentStage = recruitments
                .find(r => r.id === fixedStage.recruitmentId)
                ?.stages[fixedStage.stageIdx];
              const progress = currentStage ? getProgress(currentStage.checklist) : { percent: 0 };
              return (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>진행률</span>
                    <span className="font-medium">{progress.percent}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        progress.percent === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress.percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recruitments
                .find(r => r.id === fixedStage.recruitmentId)
                ?.stages[fixedStage.stageIdx]
                ?.checklist?.map((item) => (
                <label 
                  key={item.id} 
                  className="flex items-start gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleChecklist(fixedStage.recruitmentId, fixedStage.stageIdx, item.id)}
                    className="mt-0.5 w-4 h-4 rounded"
                  />
                  <span className={item.checked ? 'text-gray-400 line-through' : ''}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* AI 추천 상세 모달 */}
        {selectedAIRec && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[80vh] overflow-y-auto">
              <div className="bg-purple-500 text-white p-4 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <span className="font-bold text-lg">AI 일정 추천</span>
                  </div>
                  <button 
                    onClick={() => setSelectedAIRec(null)}
                    className="text-white/80 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-800">{selectedAIRec.name.replace(' (AI 추천)', '')}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded">{selectedAIRec.type}</span>
                    <span>{selectedAIRec.headcount}명 채용</span>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <div className="font-medium text-purple-800 mb-2">📊 추천 근거</div>
                  <ul className="space-y-1">
                    {selectedAIRec.analysis.reasoning.map((reason, idx) => (
                      <li key={idx} className="text-sm text-purple-700 flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="font-medium text-gray-800 mb-2">📅 추천 일정</div>
                  <div className="space-y-2">
                    {selectedAIRec.stages.map((stage, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 rounded p-2">
                        <span className="font-medium text-sm">{stage.name}</span>
                        <span className="text-sm text-gray-600">
                          {stage.start.slice(5)} ~ {stage.end.slice(5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-500">참고 전형</div>
                    <div className="font-medium">{selectedAIRec.analysis.basedOn}</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-500">예상 소요일</div>
                    <div className="font-medium">{selectedAIRec.analysis.avgDuration}일</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-500">일정 충돌</div>
                    <div className="font-medium text-emerald-600">
                      {selectedAIRec.analysis.conflictFree ? '✓ 없음' : '⚠ 있음'}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-xs text-gray-500">가용 담당자</div>
                    <div className="font-medium">{selectedAIRec.analysis.resourceAvailable.join(', ')}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => acceptAIRecommendation(selectedAIRec)}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    ✓ 이 일정으로 등록
                  </button>
                  <button
                    onClick={() => dismissAIRecommendation(selectedAIRec.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    무시
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentTimeline;
