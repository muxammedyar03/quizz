import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type QuizLevel } from "@shared/schema";

export function useQuiz(level: QuizLevel) {
  return useQuery({
    queryKey: [api.quiz.get.path, level],
    queryFn: async () => {
      // Validate level before fetching to prevent bad requests
      if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
        throw new Error('Invalid quiz level');
      }
      
      const url = buildUrl(api.quiz.get.path, { level });
      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 404) throw new Error('Quiz not found');
        throw new Error('Failed to fetch quiz');
      }
      
      return api.quiz.get.responses[200].parse(await res.json());
    },
    // Don't refetch on window focus as it resets the quiz state implicitly if data changes
    refetchOnWindowFocus: false, 
    staleTime: Infinity,
  });
}
