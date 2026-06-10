import { Eye, Share2, Trash2, MoreHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useIsMobile } from "../../../../components/ui/use-mobile";

interface QuizActionMenuProps {
  slug: string;
  onShare: () => void;
  onDelete: () => void;
}

export function QuizActionMenu({ slug, onShare, onDelete }: QuizActionMenuProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-xl">
          <DropdownMenuItem onClick={() => window.open(`/s/${slug}`, "_blank")}>
            <Eye className="w-4 h-4" />
            Lihat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShare}>
            <Share2 className="w-4 h-4" />
            Bagikan
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className="text-red-500 focus:text-red-500">
            <Trash2 className="w-4 h-4" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`/s/${slug}`}
            target="_blank"
            className="p-2 rounded-lg text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 transition-all"
          >
            <Eye className="w-4 h-4" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="top" className="rounded-lg text-xs">Lihat</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onShare}
            className="p-2 rounded-lg text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="rounded-lg text-xs">Bagikan</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="rounded-lg text-xs">Hapus</TooltipContent>
      </Tooltip>
    </div>
  );
}
