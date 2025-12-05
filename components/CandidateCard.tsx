import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Lock, MapPin, Heart, Plus, BadgeCheck, Utensils, Baby, CheckCircle2, Building2, Mail, Phone as PhoneIcon, X } from 'lucide-react';
import { Candidate, Skill } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
}

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  let icon = <CheckCircle2 size={14} />;
  if (skill.icon === 'heart') icon = <Heart size={14} className="fill-red-100 text-red-500" />;
  if (skill.icon === 'cross') icon = <Plus size={14} className="text-green-600" />;
  if (skill.icon === 'chef') icon = <Utensils size={14} className="text-orange-500" />;
  if (skill.icon === 'child') icon = <Baby size={14} className="text-blue-500" />;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
      {icon}
      {skill.name}
    </span>
  );
};

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [requestState, setRequestState] = useState<'idle' | 'loading' | 'sent'>('idle');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactFormStep, setContactFormStep] = useState<'input' | 'success'>('input');
  const [employerContact, setEmployerContact] = useState('');

  const handleRequest = () => {
    setRequestState('loading');
    // Simulate API call
    setTimeout(() => {
      setRequestState('sent');
    }, 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employerContact.trim()) return;
    setContactFormStep('success');
  };

  const resetModal = () => {
    setIsContactModalOpen(false);
    // Slight delay to reset state after transition
    setTimeout(() => {
      setContactFormStep('input');
      setEmployerContact('');
    }, 300);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Privacy Mode Header */}
        <div className="bg-slate-50 px-4 py-2 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Lock size={12} />
            Privacy Mode Active
          </div>
          <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
            <BadgeCheck size={14} className="text-blue-500 fill-blue-50" />
            Verified
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          {/* Profile Section */}
          <div className="flex gap-4 mb-4">
            <div className="relative flex-shrink-0">
              {/* Blurred Image Placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative">
                <img 
                   src={`https://picsum.photos/seed/${candidate.maskedId}/100/100`} 
                   alt="Profile" 
                   className="w-full h-full object-cover opacity-80 blur-sm scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <Lock size={20} className="text-white drop-shadow-md" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900">Candidate #{candidate.maskedId}</h3>
              <p className="text-sm text-gray-500 font-medium mt-0.5">
                {candidate.agencyName}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                  <span className="font-semibold text-yellow-600 flex items-center gap-1">
                      ★ {candidate.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span>{candidate.experienceYears} Yrs Exp</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-100 mb-4" />

          {/* Skills */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Verified Skills</p>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <SkillBadge key={idx} skill={skill} />
              ))}
            </div>
          </div>

          {/* Masked Contact Info - Removed Phone Row as requested */}
          <div className="mb-6 space-y-2.5">
            <p className="text-xs font-semibold text-gray-400 uppercase">Contact Details</p>
            <div className="flex items-center gap-3 text-sm text-gray-400 bg-gray-50 p-2 rounded border border-gray-100 select-none">
              <MapPin size={14} />
              <span className="font-mono tracking-widest">********, HK</span>
              <Lock size={12} className="ml-auto opacity-50" />
            </div>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleRequest}
              disabled={requestState !== 'idle'}
              className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2
                ${requestState === 'idle' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow' 
                  : requestState === 'loading'
                    ? 'bg-blue-100 text-blue-700 cursor-wait'
                    : 'bg-green-100 text-green-700 border border-green-200'
                }
              `}
            >
              {requestState === 'idle' && (
                 "Request Full Profile"
              )}
              {requestState === 'loading' && (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Requesting...
                </>
              )}
              {requestState === 'sent' && (
                <>
                  <CheckCircle2 size={16} />
                  Request Sent
                </>
              )}
            </button>
            
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <Building2 size={16} className="text-gray-500" />
              Contact Agency
            </button>
          </div>
        </div>
      </div>

      {/* Contact Agency Modal */}
      {isContactModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={resetModal} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={resetModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {contactFormStep === 'input' ? (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Contact Agency</h3>
                  <p className="text-gray-500 text-sm">Inquire about Candidate #{candidate.maskedId}</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{candidate.agencyName}</p>
                      <p className="text-xs text-blue-600 font-medium">Verified Partner</p>
                    </div>
                  </div>
                  <hr className="border-blue-100" />
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-3">
                      <PhoneIcon size={14} className="text-gray-400" />
                      <span>{candidate.agencyPhone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-gray-400" />
                      <span>{candidate.agencyEmail}</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium text-gray-900 bg-white/50 p-2 rounded border border-blue-100 mt-2">
                      <span className="text-gray-500 font-normal">Est. Total Cost:</span>
                      <span className="ml-auto">{candidate.estimatedCost}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Your Phone Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      value={employerContact}
                      onChange={(e) => setEmployerContact(e.target.value)}
                      placeholder="+852 9876 5432 or me@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                  >
                    Send Inquiry
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest. <br/>
                  <span className="font-semibold text-gray-900">{candidate.agencyName}</span> will contact you soon.
                </p>
                <button
                  onClick={resetModal}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default CandidateCard;