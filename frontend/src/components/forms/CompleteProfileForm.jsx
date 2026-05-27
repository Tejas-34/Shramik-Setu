import React, { useState } from 'react';
import { Building2, User } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const CompleteProfileForm = ({ completeProfile, currentUser }) => {
  const [formData, setFormData] = useState({
    full_name: currentUser?.name || '',
    role: 'worker',
    city: '',
    phone_number: '',
    verification_document_type: 'Aadhaar',
    verification_document_id: '',
    date_of_birth: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    completeProfile(formData);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
        <div className="mb-8 text-center">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            Complete your setup
          </div>
          <h3 className="mt-2 text-3xl font-black text-slate-950">Just a few more details</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Welcome to ShramikSetu, {currentUser?.name || 'User'}! Please select your primary role and verify your details to activate your account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Choose your main role</label>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'worker' })}
                className={`rounded-[1.5rem] border p-4 text-left transition-all ${
                  formData.role === 'worker'
                    ? 'border-sky-400 bg-sky-50 shadow-[0_14px_28px_rgba(14,165,233,0.12)]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <User size={18} />
                </div>
                <div className="mt-3 text-sm font-bold text-slate-950">Find work</div>
                <div className="mt-1 text-xs text-slate-500">Worker dashboard</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'employer' })}
                className={`rounded-[1.5rem] border p-4 text-left transition-all ${
                  formData.role === 'employer'
                    ? 'border-amber-400 bg-amber-50 shadow-[0_14px_28px_rgba(245,158,11,0.12)]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Building2 size={18} />
                </div>
                <div className="mt-3 text-sm font-bold text-slate-950">Hire crew</div>
                <div className="mt-1 text-xs text-slate-500">Employer dashboard</div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Full Name"
              value={formData.full_name}
              onChange={(event) => setFormData({ ...formData, full_name: event.target.value })}
              placeholder="e.g. John Doe"
              required
            />
            
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="City"
                value={formData.city}
                onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                placeholder="e.g. Mumbai"
                required
              />
              <Input
                label="Phone Number"
                value={formData.phone_number}
                onChange={(event) => setFormData({ ...formData, phone_number: event.target.value })}
                placeholder="10-digit mobile"
                required
                maxLength={10}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Date of Birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(event) => setFormData({ ...formData, date_of_birth: event.target.value })}
                required
              />
              <div className="flex flex-col gap-1.5 pt-0.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 ml-1">Doc Type</label>
                <select
                  className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-all hover:border-slate-300 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
                  value={formData.verification_document_type}
                  onChange={(event) => setFormData({ ...formData, verification_document_type: event.target.value, verification_document_id: '' })}
                >
                  <option value="Aadhaar">Aadhaar (12 digits)</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                </select>
              </div>
            </div>
            
            <Input
              label={`${formData.verification_document_type} Number`}
              value={formData.verification_document_id}
              onChange={(event) => {
                let val = event.target.value;
                if (formData.verification_document_type === 'Aadhaar') {
                  val = val.replace(/\D/g, '').slice(0, 12);
                } else if (formData.verification_document_type === 'PAN Card') {
                  val = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
                } else if (formData.verification_document_type === 'Voter ID') {
                  val = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
                }
                setFormData({ ...formData, verification_document_id: val });
              }}
              placeholder={`Enter your ${formData.verification_document_type}`}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-8">
            Complete Registration
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileForm;
