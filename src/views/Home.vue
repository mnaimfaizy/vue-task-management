<template>
    <AddTask 
        v-show="showAddTask" 
        @add-task="addTask" 
    />
    <Tasks 
        @toggle-reminder="toggleReminder" 
        @delete-task="deleteTask" 
        :tasks="tasks" 
    />
</template>

<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

export default {
    name: "Home",
    props: {
        showAddTask: Boolean,
    },
    components: {
        Tasks,
        AddTask,
    },
    data() {
        return {
            tasks: [],
        }
    },
    methods: {
    async addTask(task) {
      const res = await fetch(process.env.VUE_APP_BACKEND_URL+'/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
      })

      const response = await res.json()
      if(response.status === 200) {
        alert("Task inserted successfully!")
        console.log(response?.data)
        this.fetchTasks().then((res) => {
          this.tasks = res
        })
      } else {
        alert("Server internal error")
      }
    },
    async deleteTask(id) {
      if(confirm("Are you sure you want to delete?")) {
        const res = await fetch(`${process.env.VUE_APP_BACKEND_URL}/tasks/${id}`, {
          method: "DELETE",
        })

        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.ID !== id)) : alert('Error deleting task')
      }
    },
    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id)
      const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`${process.env.VUE_APP_BACKEND_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateTask)
      })

      let data = await res.json()
      if(data?.status === 200) {
        console.log(data?.data);
        this.tasks = this.tasks.map((task) => task.ID === id ? {...task, reminder: data?.data?.reminder} : task)
      } else {
        alert("Sorry! Something went wrong. Please try again");
      }

    },
    async fetchTasks() {
      const res = await fetch(process.env.VUE_APP_BACKEND_URL+'/tasks', {
        method: 'GET',
        header: {'Content-Type': 'application/json'},
      })

      let data = await res.json()
      data = data?.data

      return data
    },
    async fetchTask(id) {
      const res = await fetch(`${process.env.VUE_APP_BACKEND_URL}/tasks/${id}`)

      let data = await res.json()
      data = data?.data[0]

      return data
    }
  },
  async created() {
    this.tasks = await this.fetchTasks()
  }
}
</script>