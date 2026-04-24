'use client';

import React from 'react';
import { Card, Separator, ProgressBar } from '@heroui/react';
import { Smartphone, Download, Trash2, ArrowUpRight } from 'lucide-react';

export const InstallationMetrics = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-2 p-6 border shadow-sm">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-xl font-bold">Installation Performance</h2>
                        <p className="text-sm text-default-500">Comparing pass additions vs. deletions over 30 days.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <span className="text-xs font-bold">Adds</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-danger rounded-full"></div>
                            <span className="text-xs font-bold">Deletes</span>
                        </div>
                    </div>
                </div>

                {/* Mock Chart Area */}
                <div className="h-[300px] w-full bg-default-50 rounded-2xl border border-dashed border-default-300 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end px-4 gap-2">
                        {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-primary/20 rounded-t-lg" style={{ height: `${h}%` }}>
                                <div className="w-full bg-primary rounded-t-lg" style={{ height: `${h * 0.7}%` }}></div>
                            </div>
                        ))}
                    </div>
                    <span className="relative z-10 text-default-400 font-bold uppercase tracking-widest">Growth Visualization</span>
                </div>
            </Card>

            <div className="space-y-6">
                <Card className="p-6 border shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Download className="text-primary" size={20} />
                        <h3 className="font-bold">Total Installs</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black">42,850</span>
                        <span className="text-success text-sm font-bold flex items-center mb-1">
                            <ArrowUpRight size={14} />
                            +12.4%
                        </span>
                    </div>
                    <ProgressBar value={85} color="accent" size="sm" className="mt-4" />
                    <p className="text-[10px] text-default-400 mt-2 uppercase font-bold">85% retention rate</p>
                </Card>

                <Card className="p-6 border shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <Trash2 className="text-danger" size={20} />
                        <h3 className="font-bold">Deletions</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-black">1,420</span>
                        <span className="text-danger text-sm font-bold flex items-center mb-1">
                            -2.1%
                        </span>
                    </div>
                    <ProgressBar value={15} color="danger" size="sm" className="mt-4" />
                    <p className="text-[10px] text-default-400 mt-2 uppercase font-bold">Low churn detected</p>
                </Card>
            </div>
        </div>
    );
};
