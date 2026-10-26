// app/dashboard/profile/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} from '@/lib/store/api/userApi';
import { useGetMyAccountQuery } from '@/lib/store/api/accountApi';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, Trash2, Store, ShieldCheck, MapPin } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { ProfileSkeleton } from '@/components/dashboard/ProfileSkeleton';


export default function ProfileSettingsPage() {
  const { data: profile, isLoading: loadingProfile } = useGetMyProfileQuery();
  const { data: account, isLoading: loadingAccount } = useGetMyAccountQuery();
  
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleting }] = useDeleteAvatarMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // FIXED: Wrapped state initialization in useEffect to prevent render phase state updates
  useEffect(() => {
    if (profile?.data && firstName === '' && lastName === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFirstName(profile.data.first_name);
      setLastName(profile.data.last_name);
    }
  }, [profile, firstName, lastName]);

  if (loadingProfile || loadingAccount) {
    return <ProfileSkeleton />;
  }

  const user = profile?.data;
  const acc = account?.data;
  const isSeller = acc?.roles.includes('seller');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ first_name: firstName, last_name: lastName }).unwrap();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      await uploadAvatar(formData).unwrap();
      toast.success('Avatar updated');
    } catch (err) {
      toast.error('Failed to upload avatar');
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap();
      toast.success('Avatar removed');
    } catch (err) {
      toast.error('Failed to delete avatar');
    }
  };

  return (
    // FIXED: Removed max-w-4xl and added w-full to fill the remaining dashboard space evenly
    <div className="space-y-8 w-full">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Profile Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          {isSeller
            ? 'Manage your personal information and shop details.'
            : 'Manage your personal information.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-border-subtle bg-charcoal-elevated flex flex-col items-center text-center">
            <h2 className="text-sm font-semibold text-text-primary mb-4">Profile Picture</h2>
            
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-border-subtle bg-charcoal flex items-center justify-center mb-4">
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              ) : user?.avatar_url ? (
                <Image src={user.avatar_url} alt="Avatar" fill className="object-cover" />
              ) : (
                <span className="text-4xl font-bold text-text-muted">
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </span>
              )}
            </div>

            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleAvatarUpload} 
            />
            
            <div className="w-full space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-border-subtle text-text-primary hover:bg-charcoal-higher"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Camera className="mr-2 h-4 w-4" />
                Upload New
              </Button>
              {user?.avatar_url && (
                <Button 
                  variant="ghost" 
                  className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={handleDeleteAvatar}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            
            <p className="text-xs text-text-muted mt-4">
              Your avatar is visible to buyers and sellers.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-2xl border border-border-subtle bg-charcoal-elevated">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Personal Information</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1 block">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-primary outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1 block">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-primary outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-primary text-primary-foreground hover:bg-primary-600"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>

          {isSeller && (
            <div className="p-6 rounded-2xl border border-secondary/30 bg-charcoal-elevated relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-secondary" />
                    <h2 className="text-lg font-semibold text-text-primary">Shop Details</h2>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-bold text-secondary">
                    <ShieldCheck className="h-3 w-3" />
                    Pending Verification
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-text-secondary mb-1 block">Shop Name</label>
                      <input
                        type="text"
                        defaultValue="My Awesome Shop"
                        className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-secondary outline-none"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary mb-1 block">KRA PIN</label>
                      <input
                        type="text"
                        defaultValue="P051234567X"
                        className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-secondary outline-none"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <input
                        type="text"
                        defaultValue="Nairobi, Kirinyaga Road"
                        className="w-full h-12 pl-10 pr-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-secondary outline-none"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-text-muted mt-2">
                    To update your shop details or complete KYC, visit the 
                    <a href="#" className="text-secondary hover:underline ml-1">Shop Verification</a> page.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}