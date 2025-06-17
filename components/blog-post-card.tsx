import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{post.date}</span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-4">
          <h3 className="text-lg font-bold">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm">{post.excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium hover:underline underline-offset-4"
        >
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
