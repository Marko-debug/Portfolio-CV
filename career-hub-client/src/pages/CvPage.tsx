import ProfilePage from "./ProfilePage";
import AboutMe from "./AboutMe";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";
import SkillsList from "./SkillList";
import LanguagesList from "./LanguageList";
import CertificationsList from "./CertificationList";
import HobbiesList from "./HobbyList";
import ProjectsList from "./ProjectsList";

export default function CvPage() {
  return (
    <div>
      {/* Main content wrapper */}
      <div className="flex-1">
        <div className="flex flex-col md:flex-row gap-8 py-10 pr-8">
          {/* Right: Sidebar */}
          <div className="w-full md:w-56 lg:w-64 xl:w-72 flex-shrink-0 -mr-4">
            <ProfilePage />
          </div>

          {/* Left: CV content */}
          <div className="flex-1 space-y-10">
            <AboutMe />
            <ProjectsList />
            <ExperienceList />
            <EducationList />
            <SkillsList />
            <LanguagesList />
            <CertificationsList />
            <HobbiesList />
          </div>
        </div>
      </div>

    </div>
  );
}