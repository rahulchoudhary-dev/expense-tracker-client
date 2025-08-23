import ProfileHeader from "./_components/ProfileHeader";
import ProfileCard from "./_components/ProfileCard";
import ProfileForm from "./_components/ProfileForm";
import AnimatedWrapper from "./_components/AnimatedWrapper";

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 $">
      <ProfileHeader />
      <AnimatedWrapper>
        <ProfileCard />
        <ProfileForm />
      </AnimatedWrapper>
    </div>
  );
}

export default Profile;
