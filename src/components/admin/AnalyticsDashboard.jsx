import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, DollarSign, Award } from 'lucide-react';

const AnalyticsDashboard = ({ stats, registrations }) => {
  // Calculate trends
  const calculateTrend = (data, days = 7) => {
    const now = new Date();
    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const recentCount = data.filter(item => 
      new Date(item.registered_at) >= pastDate
    ).length;
    
    return recentCount;
  };

  // Group registrations by date
  const getRegistrationsByDate = () => {
    const grouped = {};
    registrations.forEach(reg => {
      const date = new Date(reg.registered_at).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + 1;
    });
    return Object.entries(grouped).slice(-7); // Last 7 days
  };

  // Group by event
  const getTopEvents = () => {
    const grouped = {};
    registrations.forEach(reg => {
      const eventName = reg.events?.name || 'Unknown';
      grouped[eventName] = (grouped[eventName] || 0) + 1;
    });
    return Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const registrationsByDate = getRegistrationsByDate();
  const topEvents = getTopEvents();
  const weeklyTrend = calculateTrend(registrations, 7);

  return (
    <div className="space-y-8">
      {/* Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="glass-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-green-500 text-sm font-medium">+{weeklyTrend} this week</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">
            {stats.totalRegistrations}
          </h3>
          <p className="text-sm text-text-secondary">Total Registrations</p>
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-green-500 text-sm font-medium">Active</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">
            {stats.totalUsers}
          </h3>
          <p className="text-sm text-text-secondary">Total Users</p>
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <span className="text-green-500 text-sm font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">
            ₹{stats.totalRevenue.toLocaleString()}
          </h3>
          <p className="text-sm text-text-secondary">Total Revenue</p>
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <span className="text-green-500 text-sm font-medium">Live</span>
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-1">
            {stats.totalEvents}
          </h3>
          <p className="text-sm text-text-secondary">Active Events</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <motion.div
          className="glass-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Registration Trend (Last 7 Days)
          </h3>
          <div className="space-y-3">
            {registrationsByDate.map(([date, count], index) => {
              const maxCount = Math.max(...registrationsByDate.map(([, c]) => c));
              const percentage = (count / maxCount) * 100;
              
              return (
                <div key={date} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{date}</span>
                    <span className="text-text-primary font-medium">{count} registrations</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Events */}
        <motion.div
          className="glass-strong rounded-2xl p-6 border border-white/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Top Events by Registrations
          </h3>
          <div className="space-y-4">
            {topEvents.map(([eventName, count], index) => {
              const maxCount = Math.max(...topEvents.map(([, c]) => c));
              const percentage = (count / maxCount) * 100;
              
              return (
                <div key={eventName} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-sm font-bold text-primary">
                        #{index + 1}
                      </div>
                      <span className="text-text-primary font-medium">{eventName}</span>
                    </div>
                    <span className="text-text-secondary text-sm">{count}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden ml-11">
                    <motion.div
                      className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        className="glass-strong rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-bold text-text-primary mb-6">Quick Insights</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {Math.round((stats.totalRegistrations / stats.totalUsers) * 10) / 10}
            </div>
            <p className="text-sm text-text-secondary">Avg. Registrations per User</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              ₹{Math.round(stats.totalRevenue / stats.totalRegistrations || 0)}
            </div>
            <p className="text-sm text-text-secondary">Avg. Revenue per Registration</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {Math.round((stats.totalRegistrations / stats.totalEvents) * 10) / 10}
            </div>
            <p className="text-sm text-text-secondary">Avg. Registrations per Event</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
