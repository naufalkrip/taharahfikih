    -- ============================================================
    -- DATABASE SCHEMA — THAVA Learning Platform v3
    -- Custom Auth: Username + Password (bcryptjs)
    -- ============================================================

    DROP TABLE IF EXISTS public.student_answers CASCADE;
    DROP TABLE IF EXISTS public.student_attempts CASCADE;
    DROP TABLE IF EXISTS public.questions CASCADE;
    DROP TABLE IF EXISTS public.quizzes CASCADE;
    DROP TABLE IF EXISTS public.users CASCADE;

    -- 1. USERS (Guru/Pembelajar)
    CREATE TABLE IF NOT EXISTS public.users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('teacher', 'admin')),
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
    ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

    -- 2. QUIZZES
    CREATE TABLE IF NOT EXISTS public.quizzes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      topic TEXT NOT NULL DEFAULT '',
      category TEXT DEFAULT '',
      description TEXT DEFAULT '',
      time_limit INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      shuffle_questions BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );
    ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

    -- 3. QUESTIONS
    CREATE TABLE IF NOT EXISTS public.questions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      options JSONB NOT NULL DEFAULT '[]'::jsonb,
      correct_index INTEGER NOT NULL,
      difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
      created_at TIMESTAMPTZ DEFAULT now()
    );
    ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

    -- 4. STUDENT_ATTEMPTS
    CREATE TABLE IF NOT EXISTS public.student_attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
      student_name TEXT NOT NULL,
      student_number TEXT DEFAULT '',
      student_class TEXT DEFAULT '',
      score INTEGER DEFAULT 0,
      total_questions INTEGER DEFAULT 0,
      percentage NUMERIC(5,2) DEFAULT 0,
      time_spent INTEGER DEFAULT 0,
      status TEXT DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed')),
      created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Prevent duplicate student attempts for the same quiz
    ALTER TABLE public.student_attempts ADD CONSTRAINT unique_student_quiz UNIQUE (quiz_id, student_name, student_number, student_class);

    ALTER TABLE public.student_attempts ENABLE ROW LEVEL SECURITY;

    -- 5. STUDENT_ANSWERS
    CREATE TABLE IF NOT EXISTS public.student_answers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      attempt_id UUID NOT NULL REFERENCES public.student_attempts(id) ON DELETE CASCADE,
      question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
      selected_index INTEGER NOT NULL,
      is_correct BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now()
    );
    ALTER TABLE public.student_answers ENABLE ROW LEVEL SECURITY;

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
    CREATE INDEX IF NOT EXISTS idx_quizzes_user_id ON public.quizzes(user_id);
    CREATE INDEX IF NOT EXISTS idx_quizzes_slug ON public.quizzes(slug);
    CREATE INDEX IF NOT EXISTS idx_questions_quiz_id ON public.questions(quiz_id);
    CREATE INDEX IF NOT EXISTS idx_student_attempts_quiz_id ON public.student_attempts(quiz_id);
    CREATE INDEX IF NOT EXISTS idx_student_answers_attempt_id ON public.student_answers(attempt_id);

    -- Disable RLS for custom auth (access control via app layer)
    ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.quizzes DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.questions DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.student_attempts DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.student_answers DISABLE ROW LEVEL SECURITY;

    -- ============================================================
    -- MIGRATIONS (safe to run on existing database)
    -- ============================================================

    ALTER TABLE public.quizzes ADD COLUMN IF NOT EXISTS category TEXT DEFAULT '';

    -- Refresh schema cache so Supabase detects new column
    NOTIFY pgrst, 'reload schema';
