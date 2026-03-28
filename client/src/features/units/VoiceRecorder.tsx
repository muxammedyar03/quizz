import { useRef, useState, useCallback } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onComplete: (durationSeconds: number) => void;
  disabled?: boolean;
  className?: string;
};

export function VoiceRecorder({ onComplete, disabled, className }: Props) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startTimeRef = useRef(0);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    const mr = mediaRecorderRef.current;
    if (!mr || mr.state === "inactive") return;
    mr.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      startTimeRef.current = Date.now();
      mr.onstop = () => {
        const sec = (Date.now() - startTimeRef.current) / 1000;
        stopStream();
        onComplete(Math.max(0, sec));
      };
      mr.start();
      setRecording(true);
    } catch {
      setError("Microphone access is required to record your response.");
    }
  };

  const handleStop = () => {
    stopRecording();
  };

  return (
    <div className={cn("space-y-3", className)}>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap items-center gap-3">
        {!recording ? (
          <Button
            type="button"
            variant="default"
            disabled={disabled}
            onClick={startRecording}
            className="gap-2"
          >
            <Mic className="h-4 w-4" />
            Start recording
          </Button>
        ) : (
          <Button type="button" variant="destructive" onClick={handleStop} className="gap-2">
            <Square className="h-4 w-4" />
            Stop &amp; save length
          </Button>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Your recording is not stored — only its length is saved for scoring.
      </p>
    </div>
  );
}
