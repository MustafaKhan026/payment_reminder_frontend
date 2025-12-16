import UserSignupForm from '@/components/auth/UserSignupForm';

export default function UserSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1A222C] flex flex-col items-center justify-center p-4 bg-[url('/bg-pattern.svg')] bg-fixed bg-cover">
      {/* Optional Brand Header */}
      <div className="mb-8">
         <img src="/Payremind logo.svg" alt="PayRemind" className="h-8 opacity-80" />
      </div>
      <UserSignupForm />
    </div>
  );
}
