import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAllData,
  getDaysRun,
  fetchMarkdownFile,
} from '@/lib/data'
import Heatmap from '@/components/Heatmap'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Avatar from '@/components/Avatar'
import { getMission } from '@/lib/missions'
import CompanyLogo from '@/components/CompanyLogo'

interface Props {
  params: Promise<{ rollnumber: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rollnumber } = await params
  const { roster } = await getAllData()
  const student = roster[rollnumber]
  return {
    title: student ? `${student.name} — Student Profile` : `Student ${rollnumber}`,
    description: student
      ? `Score breakdown, attendance, and mission submissions for ${student.name} (${rollnumber}).`
      : `Score breakdown and attendance for ${rollnumber}.`,
  }
}

export const revalidate = 60

export default async function StudentProfilePage({ params }: Props) {
  const { rollnumber } = await params
  const { roster, scoreboard, attendance, teams } = await getAllData()

  const student = roster[rollnumber]
  if (!student) notFound()

  const daysRun = getDaysRun(attendance)
  const score = scoreboard[rollnumber]
  const studentAtt = attendance[rollnumber] ?? {}
  const team = teams[student.team]
  
  // Need to get today's date dynamically to filter out future missions from the score breakdown
  const istTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
  const yyyy = istTime.getFullYear()
  const mm = String(istTime.getMonth() + 1).padStart(2, '0')
  const dd = String(istTime.getDate()).padStart(2, '0')
  const todayId = `${yyyy}-${mm}-${dd}`

  const presentCount = Object.values(studentAtt).filter(
    s => s === 'present' || s === 'manual-present'
  ).length

  // Fetch markdown files on-demand for latest day's preview
  const latestDay = daysRun[daysRun.length - 1]
  let reflectionContent: string | null = null
  let promptsContent: string | null = null

  if (latestDay) {
    ;[reflectionContent, promptsContent] = await Promise.all([
      fetchMarkdownFile(`activities/${latestDay}/${rollnumber}/reflection.md`),
      fetchMarkdownFile(`activities/${latestDay}/${rollnumber}/prompts.md`),
    ])
  }

  const latestMission = latestDay ? getMission(latestDay) : undefined

  return (
    <div className="animate-fade-in pb-12 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-slate-500 mb-2">
        <Link href="/leaderboard" className="hover:text-slate-300 transition-colors">Leaderboard</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-300">{student.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Profile Info & Heatmap */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Premium Profile Hero Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#080808] border border-slate-800 p-6 shadow-2xl">
            {/* Subtle glow effect in the background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full" />
                <div className="relative border-4 border-[#080808] rounded-full shadow-xl">
                  <Avatar seed={rollnumber} size={88} />
                </div>
              </div>
              
              <h1 className="text-2xl font-black text-white mb-1">{student.name}</h1>
              <div className="font-mono text-sm text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full mb-4">
                {rollnumber}
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 text-sm mb-6">
                <Link href={`/teams/${student.team}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-colors">
                  <span className="text-slate-400 capitalize">{student.team}</span>
                  {team && <span className="text-slate-600">·</span>}
                  {team && <span className="text-slate-300">Lab {team.lab}</span>}
                </Link>
                <a
                  href={`https://github.com/${student.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition-colors text-slate-300 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12"/></svg>
                  {student.github}
                </a>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-6" />
              
              <div className="flex w-full divide-x divide-slate-800">
                <div className="flex-1 text-center">
                  <div className="text-3xl font-black text-brand-400 tabular-nums">{score?.total ?? 0}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Total Pts</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-3xl font-black text-white tabular-nums">{presentCount}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Attended</div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Heatmap */}
          <div className="card bg-[#050505] border-slate-800">
            <h2 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Attendance Timeline</h2>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50">
              <Heatmap attendance={studentAtt} daysRun={daysRun} showLabels />
            </div>
          </div>

          {/* Manual Adjustments */}
          {score?.manualAdjustments && (
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/25 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-yellow-400 font-bold uppercase tracking-widest">Bonus Adjustment</div>
                <div className="text-sm font-black text-yellow-300">+{score.manualAdjustments.points} pts</div>
              </div>
              <div className="text-sm text-yellow-500/80 leading-relaxed">{score.manualAdjustments.reason}</div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Mission Timeline & Previews */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Mission Score Breakdown Timeline */}
          {score && Object.keys(score.byDay).length > 0 && (
            <div className="card bg-[#080808] border-slate-800">
              <h2 className="font-bold text-white mb-6 text-sm uppercase tracking-widest border-b border-slate-800 pb-4">Mission Score Breakdown</h2>
              <div className="space-y-4">
                {Object.entries(score.byDay)
                  // Filter out future missions so they aren't marked as missed if day > today
                  .filter(([day, dayScore]) => {
                    const isPresent = studentAtt[day] === 'present' || studentAtt[day] === 'manual-present';
                    const hasSubmitted = (dayScore.submitted || 0) > 0;
                    return day <= todayId || isPresent || hasSubmitted;
                  })
                  .sort(([a], [b]) => b.localeCompare(a)) // Sort descending (newest first)
                  .map(([day, dayScore]) => {
                    const mission = getMission(day)
                    const dayTotal = dayScore.submitted + dayScore.quality + dayScore.reflection + dayScore.prompting + dayScore.documentation
                    const isPresent = studentAtt[day] === 'present' || studentAtt[day] === 'manual-present'
                    const maxScore = (day === '2026-07-16' || day === '2026-07-17') ? 25 : 30
                    
                    const percent = Math.min(100, Math.max(0, (dayTotal / maxScore) * 100))

                    const missionLabel = mission?.missionName ?? new Date(day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

                    return (
                      <div key={day} className={`relative p-4 rounded-xl border transition-all ${isPresent ? 'bg-brand-900/10 border-brand-500/20 hover:border-brand-500/40' : 'bg-[#050505] border-slate-800 opacity-75'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#030303] border border-slate-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                              {mission ? <CompanyLogo name={mission.company} size={20} /> : '📅'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <Link
                                  href={`/activities/${day}`}
                                  className="font-bold text-white hover:text-brand-400 transition-colors text-base"
                                >
                                  {missionLabel}
                                </Link>
                                {isPresent ? (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Completed</span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold text-red-400 uppercase tracking-wider">Missed</span>
                                )}
                                {studentAtt[day] === 'manual-present' && (
                                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold text-yellow-400 uppercase tracking-wider">Manual</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 font-mono">{day} {mission && `· ${mission.skill}`}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:flex-row-reverse">
                            <div className="text-right">
                              <div className="text-xl font-black text-white tabular-nums leading-none mb-1">{dayTotal}<span className="text-sm text-slate-500 font-normal">/{maxScore}</span></div>
                            </div>
                            {isPresent && (
                              <Link
                                href={`/activities/${day}/${rollnumber}`}
                                className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-400 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all shadow-[0_0_10px_rgba(14,165,233,0.2)]"
                                title="View Code"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                              </Link>
                            )}
                          </div>
                        </div>

                        {isPresent && (
                          <div>
                            {/* Score Progress Bar */}
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-3">
                              <div className="h-full bg-brand-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" style={{ width: `${percent}%` }} />
                            </div>
                            
                            {/* Detailed breakdown metrics */}
                            <div className="grid grid-cols-5 gap-2">
                              {[
                                { label: 'Submit', value: dayScore.submitted, max: 10 },
                                { label: 'Quality', value: dayScore.quality, max: 10 },
                                { label: 'Reflect', value: dayScore.reflection, max: 10 },
                                { label: 'Prompt', value: dayScore.prompting, max: 10, hidden: maxScore === 25 },
                                { label: 'Docs', value: dayScore.documentation, max: 5 },
                              ].filter(m => !m.hidden).map(({ label, value, max }) => (
                                <div key={label} className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-800/50">
                                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">{label}</div>
                                  <div className="font-bold text-slate-200 tabular-nums text-sm">
                                    {value}<span className="text-slate-600 text-xs">/{max}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Latest mission markdown previews */}
          {latestDay && (reflectionContent || promptsContent) && (
            <div className="space-y-6">
              <h2 className="font-bold text-white text-lg flex items-center gap-2">
                <span className="w-2 h-6 bg-brand-500 rounded-full"></span>
                Latest Work Previews
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {reflectionContent && (
                  <div className="card bg-[#050505] border-slate-800 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">R</div>
                      <h3 className="font-bold text-white text-sm uppercase tracking-widest">reflection.md</h3>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-200 prose-a:text-brand-400">
                      <MarkdownRenderer content={reflectionContent} />
                    </div>
                  </div>
                )}

                {promptsContent && (
                  <div className="card bg-[#050505] border-slate-800 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">P</div>
                      <h3 className="font-bold text-white text-sm uppercase tracking-widest">prompts.md</h3>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-200 prose-a:text-brand-400">
                      <MarkdownRenderer content={promptsContent} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
