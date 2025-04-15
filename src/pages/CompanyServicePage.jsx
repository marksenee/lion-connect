import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";
import { apis } from "../apis/apis";
import {
  FaTrophy,
  FaStar,
  FaMedal,
  FaCalendarCheck,
  FaChalkboardTeacher,
  FaUser,
  FaExternalLinkAlt,
  FaUserCircle,
  FaGraduationCap,
  FaBriefcase,
  FaAward,
  FaCertificate,
} from "react-icons/fa";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
  padding: ${theme.spacing.xl} 0;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FilterContainer = styled.div`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.span`
  font-weight: 600;
  color: ${theme.colors.text};
  margin-right: ${theme.spacing.md};
  align-self: center;
`;

const FilterButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  background-color: ${theme.colors.white};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;

  ${(props) =>
    props.active &&
    `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    border-color: ${theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `}

  &:hover:not(:disabled) {
    background-color: ${theme.colors.lightGray};
    border-color: ${theme.colors.gray};
    transform: translateY(-2px);
  }

  ${(props) =>
    props.active &&
    `
    &:hover {
      background-color: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};
    }
  `}
`;

const StudentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
`;

const StudentCard = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.white};
  transition: ${theme.transitions.default};
  box-shadow: ${theme.shadows.sm};
  display: flex;
  flex-direction: column;
  animation: ${fadeInUp} 0.5s ease-out forwards;
  opacity: 0;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const StudentProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ProfileIconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: ${theme.spacing.md};
  background-color: ${theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid ${theme.colors.primary}30;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 30px;
    height: 30px;
    color: ${theme.colors.gray};
  }
`;

const StudentName = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xxs};
  font-weight: 600;
`;

const StudentInfo = styled.p`
  color: ${theme.colors.gray};
  margin-bottom: 0;
  font-size: 0.9rem;
`;

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border};
  margin: ${theme.spacing.lg} 0;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const SkillTag = styled.span`
  background-color: ${theme.colors.primary}1A;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.85rem;
  color: ${theme.colors.primary};
  font-weight: 500;
  transition: ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
  border: 1px solid;
  background-color: transparent;

  ${(props) => {
    let color = theme.colors.gray;
    switch (props.type) {
      case "grand":
        color = theme.colors.gold;
        break;
      case "excellent":
        color = theme.colors.secondary;
        break;
      case "good":
        color = theme.colors.primary;
        break;
      case "attendance":
        color = theme.colors.success;
        break;
      case "tutor":
        color = theme.colors.info;
        break;
    }
    return `
      color: ${color};
      border-color: ${color}80;
    `;
  }}

  svg {
    margin-right: ${theme.spacing.xxs};
    font-size: 1em;
  }
`;

const PortfolioLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: auto;
  padding-top: ${theme.spacing.md};
  font-weight: 500;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary};
    text-decoration: underline;
    svg {
      transform: translateX(2px);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
`;

const PortfolioPreview = styled.div`
  margin-top: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  transition: ${theme.transitions.default};
  margin-bottom: ${theme.spacing.md};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.sm};
  }
`;

const ProjectTitle = styled.h4`
  font-size: 1rem;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.sm};
  line-height: 1.5;
`;

const ProjectImage = styled.img`
  width: 100%;
  border-radius: ${theme.borderRadius.md};
  margin-top: ${theme.spacing.sm};
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border: 1px solid ${theme.colors.border};
`;

const ConnectButton = styled.button`
  background: linear-gradient(
    90deg,
    ${theme.colors.primary},
    ${theme.colors.secondary}
  );
  color: ${theme.colors.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: ${theme.spacing.lg};
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background: linear-gradient(
      90deg,
      ${theme.colors.secondary},
      ${theme.colors.primary}
    );
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: ${theme.colors.lightGray};
    color: ${theme.colors.gray};
    cursor: not-allowed;
  }
`;

const ProfileIcon = styled(FaUserCircle)`
  width: 60px;
  height: 60px;
  margin-right: ${theme.spacing.md};
  color: ${theme.colors.primary};
`;

const ResumeContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const ProfileContact = styled.div`
  color: ${theme.colors.textSecondary};
  margin-bottom: 16px;
`;

const ProfileLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const ProfileLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ExperienceItem = styled.div`
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ExperienceTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text};
`;

const ExperienceDate = styled.span`
  color: ${theme.colors.textSecondary};
`;

const ExperienceDescription = styled.p`
  color: ${theme.colors.text};
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const TechTag = styled.span`
  background-color: ${theme.colors.primary}20;
  color: ${theme.colors.primary};
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
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
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await apis.getResume();
        if (response.status === 200) {
          setResumeData(response.data);
        }
      } catch (error) {
        console.error("이력서 조회 에러:", error);
      }
    };

    fetchResume();
  }, []);

  if (!resumeData) {
    return <div>로딩중...</div>;
  }

  const { user, work_experiences, projects, education, awards, certificates } =
    resumeData;

  return (
    <Container>
      <Header>
        <Title>KDT 수료생 포트폴리오</Title>
        <Subtitle>
          엄선된 KDT 수료생들의 혁신적인 프로젝트와 잠재력을 확인하고,
          <br />
          기업의 성장을 이끌 인재를 만나보세요.
        </Subtitle>
      </Header>

      <FilterContainer>
        <FilterGroup>
          <FilterLabel>카테고리:</FilterLabel>
          {[
            "all",
            "UI/UX",
            "데이터분석",
            "앱개발",
            "프론트엔드",
            "백엔드",
            "클라우드 엔지니어링",
            "그로스 마케터",
            "블록체인",
          ].map((category) => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "all" ? "전체" : category}
            </FilterButton>
          ))}
        </FilterGroup>
        <FilterGroup>
          <FilterLabel>정렬:</FilterLabel>
          {["recent", "popular", "recommended"].map((filter) => (
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
        </FilterGroup>
      </FilterContainer>

      <ResumeContainer>
        <ProfileSection>
          <ProfileIconContainer>
            <FaUserCircle size={80} color={theme.colors.primary} />
          </ProfileIconContainer>
          <ProfileInfo>
            <ProfileName>{user.name}</ProfileName>
            <ProfileContact>
              <div>{user.email}</div>
              <div>{user.phone}</div>
            </ProfileContact>
            <p>{user.introduction}</p>
            <ProfileLinks>
              {user.portfolio && (
                <ProfileLink
                  href={user.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> 포트폴리오
                </ProfileLink>
              )}
              {user.blog && (
                <ProfileLink
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> 블로그
                </ProfileLink>
              )}
              {user.github && (
                <ProfileLink
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaExternalLinkAlt /> GitHub
                </ProfileLink>
              )}
            </ProfileLinks>
          </ProfileInfo>
        </ProfileSection>

        {work_experiences.length > 0 && (
          <>
            <SectionTitle>
              <FaBriefcase /> 경력
            </SectionTitle>
            <ExperienceList>
              {work_experiences.map((exp) => (
                <ExperienceItem key={exp.id}>
                  <ExperienceHeader>
                    <ExperienceTitle>
                      {exp.company} - {exp.position}
                    </ExperienceTitle>
                    <ExperienceDate>
                      {new Date(exp.start_date).toLocaleDateString()} -{" "}
                      {exp.is_current
                        ? "현재"
                        : new Date(exp.end_date).toLocaleDateString()}
                    </ExperienceDate>
                  </ExperienceHeader>
                  <ExperienceDescription>
                    {exp.description}
                  </ExperienceDescription>
                </ExperienceItem>
              ))}
            </ExperienceList>
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>
              <FaStar /> 프로젝트
            </SectionTitle>
            <ExperienceList>
              {projects.map((project) => (
                <ExperienceItem key={project.id}>
                  <ExperienceHeader>
                    <ExperienceTitle>{project.title}</ExperienceTitle>
                    <ExperienceDate>
                      {new Date(project.start_date).toLocaleDateString()} -{" "}
                      {new Date(project.end_date).toLocaleDateString()}
                    </ExperienceDate>
                  </ExperienceHeader>
                  <ExperienceDescription>
                    {project.description}
                  </ExperienceDescription>
                  {project.tech_stack && (
                    <TechStack>
                      {project.tech_stack.map((tech, index) => (
                        <TechTag key={index}>{tech}</TechTag>
                      ))}
                    </TechStack>
                  )}
                  {project.portfolio_url && (
                    <ProfileLink
                      href={project.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> 프로젝트 링크
                    </ProfileLink>
                  )}
                </ExperienceItem>
              ))}
            </ExperienceList>
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionTitle>
              <FaGraduationCap /> 학력
            </SectionTitle>
            <ExperienceList>
              {education.map((edu) => (
                <ExperienceItem key={edu.id}>
                  <ExperienceHeader>
                    <ExperienceTitle>
                      {edu.school} - {edu.major}
                    </ExperienceTitle>
                    <ExperienceDate>
                      {new Date(edu.start_date).toLocaleDateString()} -{" "}
                      {new Date(edu.end_date).toLocaleDateString()}
                    </ExperienceDate>
                  </ExperienceHeader>
                  <div>{edu.degree}</div>
                </ExperienceItem>
              ))}
            </ExperienceList>
          </>
        )}

        {awards.length > 0 && (
          <>
            <SectionTitle>
              <FaAward /> 수상
            </SectionTitle>
            <ExperienceList>
              {awards.map((award) => (
                <ExperienceItem key={award.id}>
                  <ExperienceHeader>
                    <ExperienceTitle>{award.title}</ExperienceTitle>
                    <ExperienceDate>
                      {new Date(award.start_date).toLocaleDateString()} -{" "}
                      {new Date(award.end_date).toLocaleDateString()}
                    </ExperienceDate>
                  </ExperienceHeader>
                  <ExperienceDescription>
                    {award.description}
                  </ExperienceDescription>
                </ExperienceItem>
              ))}
            </ExperienceList>
          </>
        )}

        {certificates.length > 0 && (
          <>
            <SectionTitle>
              <FaCertificate /> 자격증
            </SectionTitle>
            <ExperienceList>
              {certificates.map((cert) => (
                <ExperienceItem key={cert.id}>
                  <ExperienceHeader>
                    <ExperienceTitle>{cert.title}</ExperienceTitle>
                    <ExperienceDate>
                      {new Date(cert.issue_date).toLocaleDateString()}
                    </ExperienceDate>
                  </ExperienceHeader>
                  <div>{cert.organization}</div>
                  {cert.credential_id && (
                    <div>자격증 번호: {cert.credential_id}</div>
                  )}
                </ExperienceItem>
              ))}
            </ExperienceList>
          </>
        )}
      </ResumeContainer>
    </Container>
  );
};

export default CompanyServicePage;
