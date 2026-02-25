// ============================================================
// BUILD STATE STORE (Zustand-style using React context + reducer)
// ============================================================

import { useState, useCallback } from "react";
import type { PCBuild, CPU, GPU, Motherboard, RAM, PSU, Case, Cooler, Storage } from "../data/types";

export function createEmptyBuild(name = "My Build"): PCBuild {
  return {
    id: Date.now().toString(),
    name,
    created_at: Date.now(),
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    psu: null,
    case: null,
    cooler: null,
    storage: [],
  };
}

export function calcBuildPrice(build: PCBuild): number {
  let total = 0;
  if (build.cpu) total += build.cpu.price_inr;
  if (build.gpu) total += build.gpu.price_inr;
  if (build.motherboard) total += build.motherboard.price_inr;
  if (build.ram) total += build.ram.price_inr;
  if (build.psu) total += build.psu.price_inr;
  if (build.case) total += build.case.price_inr;
  if (build.cooler) total += build.cooler.price_inr;
  build.storage.forEach((s) => (total += s.price_inr));
  return total;
}

export function formatINR(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function useBuildStore() {
  const [currentBuild, setCurrentBuild] = useState<PCBuild>(createEmptyBuild());
  const [savedBuilds, setSavedBuilds] = useState<PCBuild[]>(() => {
    try {
      const stored = localStorage.getItem("pc_builds");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [compareBuilds, setCompareBuilds] = useState<[PCBuild | null, PCBuild | null]>([null, null]);

  const setCPU = useCallback((cpu: CPU | null) => {
    setCurrentBuild((prev) => ({ ...prev, cpu }));
  }, []);
  const setGPU = useCallback((gpu: GPU | null) => {
    setCurrentBuild((prev) => ({ ...prev, gpu }));
  }, []);
  const setMotherboard = useCallback((motherboard: Motherboard | null) => {
    setCurrentBuild((prev) => ({ ...prev, motherboard }));
  }, []);
  const setRAM = useCallback((ram: RAM | null) => {
    setCurrentBuild((prev) => ({ ...prev, ram }));
  }, []);
  const setPSU = useCallback((psu: PSU | null) => {
    setCurrentBuild((prev) => ({ ...prev, psu }));
  }, []);
  const setCase = useCallback((pcCase: Case | null) => {
    setCurrentBuild((prev) => ({ ...prev, case: pcCase }));
  }, []);
  const setCooler = useCallback((cooler: Cooler | null) => {
    setCurrentBuild((prev) => ({ ...prev, cooler }));
  }, []);
  const addStorage = useCallback((storage: Storage) => {
    setCurrentBuild((prev) => ({ ...prev, storage: [...prev.storage, storage] }));
  }, []);
  const removeStorage = useCallback((storageId: string) => {
    setCurrentBuild((prev) => ({
      ...prev,
      storage: prev.storage.filter((s) => s.id !== storageId),
    }));
  }, []);

  const saveBuild = useCallback((buildName?: string) => {
    const toSave: PCBuild = {
      ...currentBuild,
      id: Date.now().toString(),
      name: buildName || currentBuild.name,
      created_at: Date.now(),
    };
    const updated = [...savedBuilds, toSave];
    setSavedBuilds(updated);
    try {
      localStorage.setItem("pc_builds", JSON.stringify(updated));
    } catch {}
    return toSave;
  }, [currentBuild, savedBuilds]);

  const deleteSavedBuild = useCallback((buildId: string) => {
    const updated = savedBuilds.filter((b) => b.id !== buildId);
    setSavedBuilds(updated);
    try {
      localStorage.setItem("pc_builds", JSON.stringify(updated));
    } catch {}
  }, [savedBuilds]);

  const loadBuild = useCallback((build: PCBuild) => {
    setCurrentBuild({ ...build, id: Date.now().toString() });
  }, []);

  const resetBuild = useCallback(() => {
    setCurrentBuild(createEmptyBuild());
  }, []);

  const setCompareBuild = useCallback((slot: 0 | 1, build: PCBuild | null) => {
    setCompareBuilds((prev) => {
      const next: [PCBuild | null, PCBuild | null] = [...prev];
      next[slot] = build;
      return next as [PCBuild | null, PCBuild | null];
    });
  }, []);

  return {
    currentBuild,
    savedBuilds,
    compareBuilds,
    setCPU,
    setGPU,
    setMotherboard,
    setRAM,
    setPSU,
    setCase,
    setCooler,
    addStorage,
    removeStorage,
    saveBuild,
    deleteSavedBuild,
    loadBuild,
    resetBuild,
    setCompareBuild,
    setCurrentBuildName: (name: string) => setCurrentBuild((prev) => ({ ...prev, name })),
  };
}
