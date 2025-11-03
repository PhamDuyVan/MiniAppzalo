import React from 'react'


export default function FileUploader({ onFiles }) {
    async function handle(e) {
        const files = Array.from(e.target.files || []);
        const accepted = [];
        for (const f of files) {
            if (f.type.startsWith('image/')) {
                if (f.size > 5 * 1024 * 1024) { alert('Ảnh tối đa 5MB'); continue; }
                const data = await readAsDataURL(f);
                accepted.push({ type: 'image', name: f.name, size: f.size, dataUrl: data });
            } else {
                const ext = f.name.split('.').pop().toLowerCase();
                if (!['pdf', 'doc', 'docx', 'txt'].includes(ext)) { alert('Chỉ chấp nhận pdf/doc/txt'); continue; }
                if (f.size > 10 * 1024 * 1024) { alert('File tối đa 10MB'); continue; }
                const data = await readAsDataURL(f);
                accepted.push({ type: 'file', name: f.name, size: f.size, dataUrl: data });
            }
        }
        onFiles(accepted);
        e.target.value = '';
    }
    function readAsDataURL(f) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = e => res(e.target.result); r.onerror = rej; r.readAsDataURL(f); }); }
    return (
        <label className="px-3 py-2 bg-white/80 rounded cursor-pointer">
            <input type="file" multiple className="hidden" onChange={handle} />
            📎
        </label>
    )
}