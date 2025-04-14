import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import {
  FaTrophy,
  FaStar,
  FaMedal,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaUser,
} from "react-icons/fa";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background-color: transparent;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const Title = styled.h1`
  font-size: ${theme.typography.h1.fontSize};
  color: #ff7710;
  margin-bottom: ${theme.spacing.md};
  font-weight: ${theme.typography.h1.fontWeight};
  line-height: ${theme.typography.h1.lineHeight};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.body.fontSize};
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: ${theme.typography.body.lineHeight};
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
`;

const FilterButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 1px solid
    ${(props) => (props.active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  background-color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.white};
  color: ${(props) => (props.active ? theme.colors.white : theme.colors.text)};
  cursor: pointer;
  transition: ${theme.transitions.default};
  font-weight: 500;

  &:hover {
    background-color: ${(props) =>
      props.active ? theme.colors.secondary : theme.colors.lightGray};
    transform: translateY(-1px);
  }
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const StudentCard = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.white};
  transition: ${theme.transitions.default};
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const StudentName = styled.h3`
  font-size: ${theme.typography.h3.fontSize};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: ${theme.typography.h3.fontWeight};
`;

const StudentInfo = styled.p`
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.typography.small.fontSize};
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const SkillTag = styled.span`
  background-color: ${theme.colors.lightGray};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.text};
  transition: ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const PortfolioLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
  font-weight: 500;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary};
    text-decoration: underline;
  }
`;

const PortfolioPreview = styled.div`
  margin-top: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.lightGray};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ProjectTitle = styled.h4`
  font-size: ${theme.typography.body.fontSize};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: ${theme.typography.small.fontSize};
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.sm};
`;

const ProjectImage = styled.img`
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.sm};
  transition: ${theme.transitions.default};

  &:hover {
    transform: scale(1.02);
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.small.fontSize};
  font-weight: 500;
  margin-right: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
  background-color: ${(props) => {
    switch (props.type) {
      case "grand":
        return "#FFFAF5";
      case "excellent":
        return "#FFFAF5";
      case "good":
        return "#FFFAF5";
      case "attendance":
        return "#FFFAF5";
      case "tutor":
        return "#FFFAF5";
      default:
        return "#FFFAF5";
    }
  }};
  /* color: ${(props) =>
    props.type ? theme.colors.white : theme.colors.white}; */
  color: #ff7710;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    margin-right: ${theme.spacing.xs};
    font-size: 1.1em;
  }
`;

const ConnectButton = styled.button`
  background-color: #ff7710;
  color: white;
  /* color: ${theme.colors.white}; */
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: ${theme.transitions.default};
  margin-top: ${theme.spacing.md};
  width: 100%;

  &:hover {
    background-color: #ff8c00;
    transform: translateY(-2px);
  }
`;

const StudentProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
`;

const ProfileIcon = styled(FaUser)`
  width: 60px;
  height: 60px;
  padding: ${theme.spacing.sm};
  border-radius: 50%;
  margin-right: ${theme.spacing.md};
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.gray};
`;

const getBadgeIcon = (type) => {
  switch (type) {
    case "grand":
      return <FaTrophy />;
    case "excellent":
      return <FaStar />;
    case "good":
      return <FaMedal />;
    case "attendance":
      return <FaCalendarCheck />;
    case "tutor":
      return <FaChalkboardTeacher />;
    default:
      return null;
  }
};

const getBadgeText = (type) => {
  switch (type) {
    case "grand":
      return "프로젝트 대상";
    case "excellent":
      return "최우수상";
    case "good":
      return "우수상";
    case "attendance":
      return "개근상";
    case "tutor":
      return "튜터";
    default:
      return type;
  }
};

const CompanyServicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("recent");

  const categories = [
    "all",
    "UI/UX",
    "데이터분석",
    "앱개발",
    "프론트엔드",
    "백엔드",
    "클라우드 엔지니어링",
    "그로스 마케터",
    "블록체인",
  ];

  const filters = ["recent", "popular", "recommended"];

  // 10개의 더미 데이터
  const students = [
    {
      id: 1,
      name: "김수료",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg",
      course: "KDT 프론트엔드 1기",
      skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Next.js"],
      portfolio: "https://example.com/portfolio",
      badges: ["grand", "tutor"],
      projects: [
        {
          title: "쇼핑몰 웹사이트",
          description: "React와 Node.js를 사용한 풀스택 프로젝트",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 2,
      name: "이개발",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
      course: "KDT 백엔드 2기",
      skills: ["Java", "Spring Boot", "MySQL", "Docker", "AWS"],
      portfolio: "https://example.com/portfolio2",
      badges: ["excellent", "attendance"],
      projects: [
        {
          title: "API 게이트웨이 서비스",
          description: "Spring Cloud Gateway를 활용한 마이크로서비스 아키텍처",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 3,
      name: "박디자인",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
      course: "KDT UI/UX 1기",
      skills: [
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Illustrator",
        "After Effects",
      ],
      portfolio: "https://example.com/portfolio3",
      badges: ["good", "tutor"],
      projects: [
        {
          title: "모바일 앱 UI/UX 리디자인",
          description: "사용자 경험 개선을 위한 앱 리디자인 프로젝트",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 4,
      name: "정데이터",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
      course: "KDT 데이터분석 2기",
      skills: ["Python", "Pandas", "TensorFlow", "SQL", "Tableau"],
      portfolio: "https://example.com/portfolio4",
      badges: ["grand", "excellent"],
      projects: [
        {
          title: "고객 행동 예측 모델",
          description: "머신러닝을 활용한 고객 구매 패턴 분석",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 5,
      name: "최앱개발",
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
      course: "KDT 앱개발 1기",
      skills: ["React Native", "Flutter", "Firebase", "Redux", "GraphQL"],
      portfolio: "https://example.com/portfolio5",
      badges: ["excellent", "attendance"],
      projects: [
        {
          title: "헬스케어 모바일 앱",
          description: "React Native로 개발한 건강 관리 앱",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 6,
      name: "강클라우드",
      profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
      course: "KDT 클라우드 엔지니어링 1기",
      skills: ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD"],
      portfolio: "https://example.com/portfolio6",
      badges: ["good", "tutor"],
      projects: [
        {
          title: "클라우드 인프라 구축",
          description: "AWS를 활용한 마이크로서비스 아키텍처 구축",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 7,
      name: "윤마케터",
      profileImage: "https://randomuser.me/api/portraits/women/7.jpg",
      course: "KDT 그로스 마케터 1기",
      skills: [
        "Google Analytics",
        "SEO",
        "Content Marketing",
        "Social Media",
        "Data Analysis",
      ],
      portfolio: "https://example.com/portfolio7",
      badges: ["excellent", "attendance"],
      projects: [
        {
          title: "바이럴 마케팅 캠페인",
          description: "소셜 미디어를 활용한 성공적인 마케팅 캠페인",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 8,
      name: "장블록체인",
      profileImage: "https://randomuser.me/api/portraits/men/8.jpg",
      course: "KDT 블록체인 1기",
      skills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts", "DeFi"],
      portfolio: "https://example.com/portfolio8",
      badges: ["grand", "tutor"],
      projects: [
        {
          title: "NFT 마켓플레이스",
          description: "이더리움 기반 NFT 거래 플랫폼",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 9,
      name: "한프론트",
      profileImage: "https://randomuser.me/api/portraits/women/9.jpg",
      course: "KDT 프론트엔드 2기",
      skills: ["Vue.js", "Nuxt.js", "Tailwind CSS", "GraphQL", "Jest"],
      portfolio: "https://example.com/portfolio9",
      badges: ["good", "attendance"],
      projects: [
        {
          title: "실시간 채팅 웹앱",
          description: "Vue.js와 Socket.io를 활용한 실시간 채팅 서비스",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
    {
      id: 10,
      name: "서백엔드",
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
      course: "KDT 백엔드 1기",
      skills: ["Node.js", "Express", "MongoDB", "Redis", "GraphQL"],
      portfolio: "https://example.com/portfolio10",
      badges: ["excellent", "tutor"],
      projects: [
        {
          title: "실시간 알림 시스템",
          description: "WebSocket을 활용한 실시간 알림 서비스",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    },
  ];

  const handleConnect = (studentId) => {
    // 연락처 공유 로직 구현
    alert("연락처 공유 요청이 전송되었습니다.");
  };

  return (
    <Container>
      <Header>
        <Title>KDT 수료생 포트폴리오</Title>
        <Subtitle>
          우수한 KDT 수료생들의 포트폴리오를 한눈에 확인하세요
        </Subtitle>
      </Header>

      <FilterSection>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "all" ? "전체" : category}
          </FilterButton>
        ))}
      </FilterSection>

      <FilterSection>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            active={selectedFilter === filter}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter === "recent"
              ? "최신순"
              : filter === "popular"
              ? "인기순"
              : "추천순"}
          </FilterButton>
        ))}
      </FilterSection>

      <StudentGrid>
        {students.map((student) => (
          <StudentCard key={student.id}>
            <StudentProfile>
              <ProfileIcon />
              <div>
                <StudentName>{student.name}</StudentName>
                <StudentInfo>{student.course}</StudentInfo>
              </div>
            </StudentProfile>

            <Skills>
              {student.badges.map((badge, index) => (
                <Badge key={index} type={badge}>
                  {getBadgeIcon(badge)}
                  {getBadgeText(badge)}
                </Badge>
              ))}
            </Skills>

            <Skills>
              {student.skills.map((skill) => (
                <SkillTag key={skill}>{skill}</SkillTag>
              ))}
            </Skills>

            {student.projects &&
              student.projects.map((project, index) => (
                <PortfolioPreview key={index}>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectImage src={project.image} alt={project.title} />
                </PortfolioPreview>
              ))}

            <PortfolioLink
              href={student.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              전체 포트폴리오 보기 →
            </PortfolioLink>

            <ConnectButton onClick={() => handleConnect(student.id)}>
              커넥트
            </ConnectButton>
          </StudentCard>
        ))}
      </StudentGrid>
    </Container>
  );
};

export default CompanyServicePage;
