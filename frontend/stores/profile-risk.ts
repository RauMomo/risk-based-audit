import { defineStore } from "pinia";
import type {
  RiskProfile,
  RiskProfileItem,
  ImpactLevel,
  PossibilityLevel,
} from "~/types/risk";

export interface RiskMatrixCell {
  name: string;
  riskId1: string;
  riskId2: string;
  riskId3: string;
  riskId4: string;
  riskId5: string;
}

export interface RiskListItem {
  risk_id: string;
  risk_name: string;
  risk_category: string;
  risk_level: string;
  list_residual_risks: RiskPoint[];
  latest_impact_level: number;
  latest_possibility_level: number;
}

export interface RiskPoint {
  impact_level: number;
  possibility_level: number;
}

export interface CreateRiskProfilePayload {
  risk_name: string;
  risk_category: string;
  list_residual_risks: RiskPoint[];
}

interface RiskProfileState {
  riskMatrix: RiskMatrixCell[];
  riskList: RiskListItem[];
  loading: boolean;
  error: string | null;
}

export const useRiskProfileStore = defineStore("risk-profile", {
  state: (): RiskProfileState => ({
    riskMatrix: [
      {
        name: "Hampir Pasti Terjadi",
        riskId1: "Low to Moderate 7",
        riskId2: "Moderate 12",
        riskId3: "Moderate to High 17",
        riskId4: "High 22",
        riskId5: "High 25",
      },
      {
        name: "Sangat Mungkin Terjadi",
        riskId1: "Low 4",
        riskId2: "Low to Moderate 9",
        riskId3: "Moderate 14",
        riskId4: "Moderate to High 19",
        riskId5: "High 24",
      },
      {
        name: "Bisa Terjadi",
        riskId1: "Low 3",
        riskId2: "Low to Moderate 8",
        riskId3: "Moderate 13",
        riskId4: "Moderate to High 18",
        riskId5: "High 23",
      },
      {
        name: "Jarang Terjadi",
        riskId1: "Low 2",
        riskId2: "Low to Moderate 6",
        riskId3: "Low to Moderate 11",
        riskId4: "Moderate to High 16",
        riskId5: "High 21",
      },
      {
        name: "Sangat Jarang Terjadi",
        riskId1: "Low 1",
        riskId2: "Low 5",
        riskId3: "Low to Moderate 10",
        riskId4: "Moderate 15",
        riskId5: "High 20",
      },
    ],
    riskList: [],
    loading: false,
    error: null,
  }),

  getters: {
    getRiskMatrix: (state) => state.riskMatrix,
    getRiskList: (state) => state.riskList,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,

    getRiskById: (state) => (id: string) => {
      return state.riskList.find((risk) => risk.risk_id === id);
    },

    getRisksByCategory: (state) => (category: string) => {
      return state.riskList.filter((risk) => risk.risk_category === category);
    },

    getHighRisks: (state) => {
      return state.riskList.filter(
        (risk) =>
          risk.risk_level === "High" || risk.risk_level === "Moderate to High",
      );
    },
  },

  actions: {
    async fetchRiskProfiles() {
      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch<RiskListItem[]>("/api/risk-profile", {
          method: "GET",
        });

        this.riskList = response;
      } catch (error: any) {
        this.error = error.message || "Failed to fetch risk profiles";
        console.error("Error fetching risk profiles:", error);
      } finally {
        this.loading = false;
      }
    },

    async createRiskProfile(payload: CreateRiskProfilePayload) {
      this.loading = true;
      this.error = null;

      try {
        // const response = await $fetch<RiskListItem>("/api/risk-profile", {
        //   method: "POST",
        //   body: payload,
        // });

        const id = generatedRiskProfileId(
          payload.risk_category,
          this.riskList.length,
        );

        const riskPoint =
          payload.list_residual_risks[payload.list_residual_risks.length - 1];

        this.riskList.push({
          risk_id: id,
          risk_name: payload.risk_name,
          risk_category: payload.risk_category,
          risk_level: this.calculateRiskLevel(
            riskPoint?.impact_level!,
            riskPoint?.possibility_level!,
          ),
          list_residual_risks: payload.list_residual_risks,
          latest_impact_level: riskPoint?.impact_level!,
          latest_possibility_level: riskPoint?.possibility_level!,
        });
      } catch (error: any) {
        this.error = error.message || "Failed to create risk profile";
        console.error("Error creating risk profile:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateRiskProfile(
      id: string,
      payload: Partial<CreateRiskProfilePayload>,
    ) {
      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch<RiskListItem>(`/api/risk-profile/${id}`, {
          method: "PUT",
          body: payload,
        });

        const index = this.riskList.findIndex((risk) => risk.risk_id === id);
        if (index !== -1) {
          this.riskList[index] = response;
        }

        return response;
      } catch (error: any) {
        this.error = error.message || "Failed to update risk profile";
        console.error("Error updating risk profile:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteRiskProfile(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await $fetch(`/api/risk-profile/${id}`, {
          method: "DELETE",
        });

        this.riskList = this.riskList.filter((risk) => risk.risk_id !== id);
      } catch (error: any) {
        this.error = error.message || "Failed to delete risk profile";
        console.error("Error deleting risk profile:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    calculateRiskLevel(impactLevel: number, possibilityLevel: number): string {
      const riskScore = impactLevel * possibilityLevel;

      if (riskScore <= 4) return "Low";
      if (riskScore <= 10) return "Low to Moderate";
      if (riskScore <= 15) return "Moderate";
      if (riskScore <= 20) return "Moderate to High";
      return "High";
    },

    clearError() {
      this.error = null;
    },
  },
});
