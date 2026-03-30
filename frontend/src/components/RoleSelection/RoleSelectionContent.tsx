'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelectionHeader from './RoleSelectionHeader';
import RoleOptionCard from './RoleOptionCard';
import ContinueButton from './ContinueButton';

export default function RoleSelectionContent() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'fan' | 'creator' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      const backendRole = selectedRole === 'fan' ? 'user' : 'creator';
      router.push(`/signup?role=${backendRole}`);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-[32px] h-full items-center justify-center min-h-px min-w-px relative w-full lg:max-w-[644px] mx-auto lg:mr-0 lg:ml-auto lg:pr-8 xl:pr-16">
      <RoleSelectionHeader />
      
      <div className="flex flex-col gap-[16px] w-full mt-4">
        <RoleOptionCard 
          title="Explore as a Fan"
          description="Discover creators, enjoy exclusive content, and support your favorites."
          isSelected={selectedRole === 'fan'}
          onClick={() => setSelectedRole('fan')}
        />
        
        <RoleOptionCard 
          title="Become a Creator"
          description="Share your content, build your audience, and start earning"
          isSelected={selectedRole === 'creator'}
          onClick={() => setSelectedRole('creator')}
        />
      </div>

      <div className="flex w-full justify-center mt-[16px]">
        <ContinueButton onClick={handleContinue} disabled={!selectedRole} />
      </div>
    </div>
  );
}
