import { postToLeaderBoardUrls } from "./postToLeaderBoardUrls";
import { describe, expect, it } from "vitest";

describe("postToLeaderBoardUrls", () => {
   
    it("should have correct URLs for each difficulty level", () => {
        expect(postToLeaderBoardUrls).toEqual({
            Easy: "https://memory-game-backend-production-e873.up.railway.app/easy-leader-board/add-easy-top-scorer",
            Medium: "https://memory-game-backend-production-e873.up.railway.app/medium-leader-board/add-medium-top-scorer",
            Hard: "https://memory-game-backend-production-e873.up.railway.app/hard-leader-board/add-hard-top-scorer",
        });
    });

    it("should contain URLs for Easy, Medium, and Hard difficulty levels", () => {
        expect(postToLeaderBoardUrls).toHaveProperty("Easy");
        expect(postToLeaderBoardUrls).toHaveProperty("Medium");
        expect(postToLeaderBoardUrls).toHaveProperty("Hard");
    });

    it("should not contain URLs for undefined difficulty levels", () => {
        expect(postToLeaderBoardUrls).not.toHaveProperty("Very Hard");
        expect(postToLeaderBoardUrls).not.toHaveProperty("Impossible");
    });

    it("should have non-empty string URLs for each difficulty level", () => {
        Object.values(postToLeaderBoardUrls).forEach((url) => {
            expect(typeof url).toBe("string");
            expect(url.length).toBeGreaterThan(0);
        });
    });

});
