import { useQueryClient, useMutation } from '@tanstack/react-query';
import api from '@/utils/axiosInterceptor';
import type { lessonType } from '@/components/dialogs/lesson-dialog';
import toast from 'react-hot-toast';
const lessonMutation = (courseId: string | undefined) => {
    const queryClient = useQueryClient();
    const lessonMutation = useMutation({

        mutationFn: async (data: lessonType) => ((await api.post(`/api/instructor/course/${courseId}/lesson`, data)).data),
        onSuccess: (data) => {
            toast.success(data?.msg || "lesson has been created successfully");
            queryClient.invalidateQueries({ queryKey: ['lessons'] });
        },
        onError: (err) => {
            console.log(err);
        }
    })
    return lessonMutation
}

export default lessonMutation