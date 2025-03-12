import type {Database} from "~/types/database.types";

interface ErrorHandler {
  error: any
  route: string
}

const errorQueue = ref<{ error: any; userId: string | null }[]>([]);
const isProcessing = ref(false);
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser()

const debounce = (fn: Function, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

async function insertErrorsBatch() {
  if (errorQueue.value.length === 0) return;

  isProcessing.value = true;

  const errorsToInsert = [...errorQueue.value];
  errorQueue.value = [];

  try {
    const { error } = await supabase.from("errors").insert(errorsToInsert);
    if (error) throw error;
  } catch (err) {
    console.error("Failed to insert errors:", err);
  }

  isProcessing.value = false;
}

const debouncedInsertErrors = debounce(insertErrorsBatch, 5000);

const useErrorHandler = async ({error, route}: ErrorHandler) => {
  if (!user.value) return
  errorQueue.value.push({ error, user_id: user.value.id, location: route });

  if (!isProcessing.value) {
    debouncedInsertErrors();
  }
}

export default useErrorHandler